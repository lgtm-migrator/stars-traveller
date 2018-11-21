import { Directive, Input, OnInit, OnChanges } from '@angular/core';
import * as THREE from 'three';

@Directive({ selector: '[appThreePerspectiveCamera]' })
export class PerspectiveCameraDirective implements OnInit, OnChanges {

    @Input() height: number;
    @Input() width: number;
    @Input() positions = [0, 0, 0];

    viewAngle = 25;
    near = 50;
    far = 1e7;
    camera: THREE.PerspectiveCamera;

    get aspect(): number {
        return this.width / this.height;
    }

    ngOnInit() {
        this.camera = new THREE.PerspectiveCamera(
            this.viewAngle,
            this.aspect,
            this.near,
            this.far
        );
    }

    ngOnChanges(changes) {
        const widthChng = changes.width && changes.width.currentValue;
        const heightChng = changes.height && changes.height.currentValue;

        if (widthChng || heightChng) {
            this.updateAspect(this.width / this.height);
        }
    }

    updateAspect(ratio) {
        if (this.camera) {
            this.camera.aspect = ratio;
            this.camera.updateProjectionMatrix();
        }
    }

}