import {PresentationControls, useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import logo from 'assets/models/logo.glb';
import React, {useRef} from 'react';
import {shallowEqual} from 'react-redux';
import {Theme} from 'src/utils/themes';
import {Color, Mesh, MeshPhongMaterial} from 'three';

export const Loader: React.FC<{theme: Theme; visible: boolean}> = React.memo(
  ({theme, visible}) => {
    const scene = useGLTF(logo).scene;

    const colors = {
      face: new Color(theme.accent.t),
      bevel: new Color(theme.accent.c),
    };

    for (const child of scene.children) {
      const color = colors[child.name as keyof typeof colors];
      (child as Mesh).material = new MeshPhongMaterial({
        color: color,
        specular: new Color('#202020'),
        shininess: 200,
      });
    }

    const ref = useRef({
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    useFrame(({clock}) => {
      const speed = 0.25;
      const linearity = 0.5;

      const ramp = ((clock.elapsedTime * speed + 1) % 2) - 1;
      const scaled = (Math.pow(ramp, 3) + ramp * linearity) / (1 + linearity);

      ref.current.rotation.y = scaled * Math.PI;
    });

    return (
      <>
        <group scale={visible ? 0.15 : 0} position={[0, 0, -20]}>
          <PresentationControls
            enabled={true}
            global={true}
            snap={true}
            polar={[-Math.PI / 2, Math.PI / 2]}
          >
            <primitive object={scene} ref={ref} />
          </PresentationControls>
        </group>
      </>
    );
  },
  shallowEqual,
);
