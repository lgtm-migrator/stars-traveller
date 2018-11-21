import { Directive, Input, OnInit, OnChanges } from '@angular/core';
import * as THREE from 'three';

@Directive({ selector: '[appPointLight]' })
export class PointLightDirective implements OnInit, OnChanges {

    @Input() color = '#FFFF00';
    @Input() position: number[] = [0, 250, 0];

    object: THREE.PointLight;

    ngOnInit() {
        this.object = new THREE.PointLight(this.color);
        this.setPosition(this.position);
    }

    ngOnChanges(changes) {
        if (changes.position && changes.position.currentValue) {
            this.setPosition(this.position);
        }
    }

    setPosition(position) {
        this.object.position.set(
            position[0],
            position[1],
            position[2]
        );
    }

}
