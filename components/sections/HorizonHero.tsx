'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizonHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(1);
    const [isReady, setIsReady] = useState(false);

    const totalSections = 2;

    const threeRefs = useRef<{
        scene: THREE.Scene | null;
        camera: THREE.PerspectiveCamera | null;
        renderer: THREE.WebGLRenderer | null;
        stars: THREE.Points[];
        nebula: THREE.Mesh | null;
        mountains: THREE.Mesh[];
        animationId: number | null;
        locations: number[];
        targetCameraX?: number;
        targetCameraY?: number;
        targetCameraZ?: number;
    }>({
        scene: null,
        camera: null,
        renderer: null,
        stars: [],
        nebula: null,
        mountains: [],
        animationId: null,
        locations: []
    });

    // Initialize Three.js
    useEffect(() => {
        const initThree = () => {
            const { current: refs } = threeRefs;

            // Scene setup
            refs.scene = new THREE.Scene();
            refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

            // Camera
            refs.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                2000
            );
            refs.camera.position.z = 100;
            refs.camera.position.y = 20;

            // Renderer
            if (!canvasRef.current) return;

            refs.renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                antialias: true,
                alpha: true
            });
            refs.renderer.setSize(window.innerWidth, window.innerHeight);
            refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            refs.renderer.toneMappingExposure = 0.5;

            // Create scene elements
            createStarField();
            createNebula();
            createMountains();
            createAtmosphere();
            getLocation();

            // Start animation
            animate();

            // Mark as ready after Three.js is initialized
            setIsReady(true);
        };

        const createStarField = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const starCount = 5000;

            for (let i = 0; i < 3; i++) {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(starCount * 3);
                const colors = new Float32Array(starCount * 3);
                const sizes = new Float32Array(starCount);

                for (let j = 0; j < starCount; j++) {
                    const radius = 200 + Math.random() * 800;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(Math.random() * 2 - 1);

                    positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                    positions[j * 3 + 2] = radius * Math.cos(phi);

                    // Pure white/gray stars only
                    const color = new THREE.Color();
                    color.setHSL(0, 0, 0.6 + Math.random() * 0.4);

                    colors[j * 3] = color.r;
                    colors[j * 3 + 1] = color.g;
                    colors[j * 3 + 2] = color.b;

                    sizes[j] = Math.random() * 2 + 0.5;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        depth: { value: i }
                    },
                    vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
                    fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });

                const stars = new THREE.Points(geometry, material);
                refs.scene!.add(stars);
                refs.stars.push(stars);
            }
        };
        const createNebula = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(0x111111) },
                    color2: { value: new THREE.Color(0x222222) },
                    opacity: { value: 0.1 }
                },
                vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const nebula = new THREE.Mesh(geometry, material);
            nebula.position.z = -1050;
            nebula.rotation.x = 0;
            refs.scene!.add(nebula);
            refs.nebula = nebula;
        };

        const createMountains = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const layers = [
                { distance: -50, height: 60, color: 0x1a1a2e, opacity: 0.9 },
                { distance: -100, height: 80, color: 0x16213e, opacity: 0.7 },
                { distance: -150, height: 100, color: 0x0f1a2e, opacity: 0.5 },
                { distance: -200, height: 120, color: 0x0a1520, opacity: 0.3 }
            ];

            layers.forEach((layer, index) => {
                const points = [];
                const segments = 50;

                for (let i = 0; i <= segments; i++) {
                    const x = (i / segments - 0.5) * 1000;
                    const y = Math.sin(i * 0.1) * layer.height +
                        Math.sin(i * 0.05) * layer.height * 0.5 +
                        Math.random() * layer.height * 0.2 - 100;
                    points.push(new THREE.Vector2(x, y));
                }

                points.push(new THREE.Vector2(5000, -300));
                points.push(new THREE.Vector2(-5000, -300));

                const shape = new THREE.Shape(points);
                const geometry = new THREE.ShapeGeometry(shape);
                const material = new THREE.MeshBasicMaterial({
                    color: layer.color,
                    transparent: true,
                    opacity: layer.opacity,
                    side: THREE.DoubleSide
                });

                const mountain = new THREE.Mesh(geometry, material);
                mountain.position.z = layer.distance;
                mountain.position.y = layer.distance;
                mountain.userData = { baseZ: layer.distance, index };
                refs.scene!.add(mountain);
                refs.mountains.push(mountain);
            });
        };

        const createAtmosphere = () => {
            const { current: refs } = threeRefs;
            if (!refs.scene) return;

            const geometry = new THREE.SphereGeometry(600, 32, 32);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            const atmosphere = new THREE.Mesh(geometry, material);
            refs.scene!.add(atmosphere);
        };

        const animate = () => {
            const { current: refs } = threeRefs;
            refs.animationId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Update stars
            refs.stars.forEach((starField, i) => {
                const material = starField.material as THREE.ShaderMaterial;
                if (material.uniforms) {
                    material.uniforms.time.value = time;
                }
            });

            // Update nebula
            if (refs.nebula) {
                const material = refs.nebula.material as THREE.ShaderMaterial;
                if (material.uniforms) {
                    material.uniforms.time.value = time * 0.5;
                }
            }

            // Smooth camera movement with easing
            if (refs.camera && refs.targetCameraX !== undefined) {
                const smoothingFactor = 0.05;

                smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
                smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor;
                smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor;

                // Add subtle floating motion
                const floatX = Math.sin(time * 0.1) * 2;
                const floatY = Math.cos(time * 0.15) * 1;

                // Apply final position
                refs.camera.position.x = smoothCameraPos.current.x + floatX;
                refs.camera.position.y = smoothCameraPos.current.y + floatY;
                refs.camera.position.z = smoothCameraPos.current.z;
                refs.camera.lookAt(0, 10, -600);
            }

            // Parallax mountains with subtle animation
            refs.mountains.forEach((mountain, i) => {
                const parallaxFactor = 1 + i * 0.5;
                mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
                mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
            });

            if (refs.renderer) {
                refs.renderer.render(refs.scene!, refs.camera!);
            }
        };

        const getLocation = () => {
            const { current: refs } = threeRefs;
            const locations: number[] = [];
            refs.mountains.forEach((mountain, i) => {
                locations[i] = mountain.position.z;
            });
            refs.locations = locations;
        };

        initThree();

        // Handle resize
        const handleResize = () => {
            const { current: refs } = threeRefs;
            if (refs.camera && refs.renderer) {
                refs.camera.aspect = window.innerWidth / window.innerHeight;
                refs.camera.updateProjectionMatrix();
                refs.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            const { current: refs } = threeRefs;
            if (refs.animationId) {
                cancelAnimationFrame(refs.animationId);
            }
            window.removeEventListener('resize', handleResize);

            // Dispose Three.js resources
            refs.stars.forEach(starField => {
                starField.geometry.dispose();
                if (Array.isArray(starField.material)) {
                    starField.material.forEach(mat => mat.dispose());
                } else {
                    starField.material.dispose();
                }
            });
            refs.mountains.forEach(mountain => {
                mountain.geometry.dispose();
                if (Array.isArray(mountain.material)) {
                    mountain.material.forEach(mat => mat.dispose());
                } else {
                    mountain.material.dispose();
                }
            });
            if (refs.nebula) {
                refs.nebula.geometry.dispose();
                if (Array.isArray(refs.nebula.material)) {
                    refs.nebula.material.forEach(mat => mat.dispose());
                } else {
                    refs.nebula.material.dispose();
                }
            }
            if (refs.renderer) {
                refs.renderer.dispose();
            }
        };
    }, []);

    // GSAP Animations - Run after component is ready
    useEffect(() => {
        if (!isReady) return;

        // Set initial states to prevent flash
        gsap.set([menuRef.current, titleRef.current, subtitleRef.current, statsRef.current, ctaRef.current, scrollProgressRef.current], {
            visibility: 'visible'
        });

        const tl = gsap.timeline();

        // Animate menu
        if (menuRef.current) {
            tl.from(menuRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }

        // Animate title with split text
        if (titleRef.current) {
            const titleChars = titleRef.current.querySelectorAll('.title-char');
            tl.from(titleChars, {
                y: 200,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power4.out"
            }, "-=0.5");
        }

        // Animate subtitle lines
        if (subtitleRef.current) {
            const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
            tl.from(subtitleLines, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.8");
        }

        // Animate stats
        if (statsRef.current) {
            tl.from(statsRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6");
        }

        // Animate CTA buttons
        if (ctaRef.current) {
            tl.from(ctaRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.4");
        }

        // Animate scroll indicator
        if (scrollProgressRef.current) {
            tl.from(scrollProgressRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5");
        }

        return () => {
            tl.kill();
        };
    }, [isReady]);

    // Scroll handling
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
            const progress = Math.min(scrollY / maxScroll, 1);

            setScrollProgress(progress);
            const newSection = Math.floor(progress * totalSections);
            setCurrentSection(newSection);

            const { current: refs } = threeRefs;

            // Calculate smooth progress through all sections
            const totalProgress = progress * totalSections;
            const sectionProgress = totalProgress % 1;

            // Define camera positions for each section
            const cameraPositions = [
                { x: 0, y: 30, z: 300 },    // Section 0 - HORIZON
                { x: 0, y: 40, z: -50 },     // Section 1 - COSMOS
                { x: 0, y: 50, z: -700 }       // Section 2 - INFINITY
            ];

            // Get current and next positions
            const currentPos = cameraPositions[newSection] || cameraPositions[0];
            const nextPos = cameraPositions[newSection + 1] || currentPos;

            // Set target positions (actual smoothing happens in animate loop)
            refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
            refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
            refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

            // Smooth parallax for mountains
            refs.mountains.forEach((mountain, i) => {
                const speed = 1 + i * 0.9;
                const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;

                if (refs.nebula) {
                    refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
                }

                // Use the same smoothing approach
                mountain.userData.targetZ = targetZ;

                if (progress > 0.7) {
                    mountain.position.z = 600000;
                }
                if (progress < 0.7) {
                    mountain.position.z = refs.locations[i];
                }
            });

            if (refs.nebula && refs.mountains[3]) {
                refs.nebula.position.z = refs.mountains[3].position.z;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalSections]);

    const splitTitle = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="title-char">{char}</span>
        ));
    };

    return (
        <div ref={containerRef} className="hero-container cosmos-style">
            <canvas ref={canvasRef} className="hero-canvas" />

            {/* Side menu */}
            <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
                <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="vertical-text">DESIGN</div>
            </div>

            {/* Main content */}
            <div className="hero-content cosmos-content">
                <div className="mb-8">
                    {/* <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-6">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold tracking-wider text-white">
                            ESTABLISHED 2016
                        </span>
                    </div> */}
                </div>
                <h1 ref={titleRef} className="hero-title">
                    {/* {splitTitle("F.S.INFRASTRUCTURE")} */}
                </h1>
                {/* <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
                    <p className="subtitle-line">Where architectural vision meets design excellence</p>
                    <p className="subtitle-line">Creating spaces that inspire and endure</p>
                </div> */}

                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12" style={{ visibility: 'hidden' }}>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">100+</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">Projects</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">8+</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">Years</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">Army</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">Recognized</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ visibility: 'hidden' }}>
                    <button className="btn-primary group relative overflow-hidden">
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>View Portfolio</span>
                        </span>
                    </button>
                    <button className="btn-secondary group">
                        <span className="flex items-center space-x-2">
                            <span>Free Consultation</span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
                <div className="scroll-text">SCROLL</div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
                </div>
                <div className="section-counter">
                    {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
                </div>
            </div>

            {/* Additional sections for scrolling */}
            <div className="scroll-sections">
                {[...Array(2)].map((_, i) => {
                    const titles = {
                        0: '',
                        1: 'F.S.INFRASTRUCTURE',
                        2: 'TRUSTED QUALITY'
                    };
                    const subtitles = {
                        0: {
                            line1: 'Where architectural vision meets design excellence',
                            line2: 'Creating spaces that inspire and endure'
                        },
                        1: {
                            line1: 'Innovative interior design solutions',
                            line2: 'Transforming spaces with sustainable materials'
                        },
                        2: {
                            line1: 'Recognized by Indian Army for exceptional quality',
                            line2: 'Building trust through superior craftsmanship'
                        }
                    };

                    const stats = [
                        [
                            { value: "100+", label: "Projects" },
                            { value: "8+", label: "Years" },
                            { value: "Army", label: "Recognized" }
                        ],
                        [
                            { value: "500+", label: "Clients" },
                            { value: "15+", label: "Awards" },
                            { value: "2M+", label: "Sq Ft" }
                        ]
                    ];

                    return (
                        <section key={i} className="content-section">
                            <div className="mb-8">
                                <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-6">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold tracking-wider text-white">
                                        ESTABLISHED 2016
                                    </span>
                                </div>
                            </div>
                            <h1 className="hero-title">
                                {splitTitle(titles[i + 1 as keyof typeof titles] || 'DEFAULT')}
                            </h1>
                            <div className="hero-subtitle cosmos-subtitle">
                                <p className="subtitle-line">{subtitles[i + 1 as keyof typeof subtitles]?.line1}</p>
                                <p className="subtitle-line">{subtitles[i + 1 as keyof typeof subtitles]?.line2}</p>
                            </div>

                            {/* Stats for each section */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
                                {stats[i]?.map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons for each section */}
                            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <button className="btn-primary group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <span>View Portfolio</span>
                                    </span>
                                </button>
                                <button className="btn-secondary group">
                                    <span className="flex items-center space-x-2">
                                        <span>Free Consultation</span>
                                    </span>
                                </button>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}