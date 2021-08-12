import * as THREE from 'three';

import {
    ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit,
    SimpleChanges
} from '@angular/core';
import { MainModel } from '@app/app.model';
import { TranslateService } from '@ngx-translate/core';

import { ThreeComponentModel } from './three-component.model';
import { ThreeComponentService } from './three-component.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeComponent implements OnInit, OnChanges, OnDestroy {
  private _threeComponentModel: ThreeComponentModel;
  @Input() options: MainModel;

  initDist: number;
  mouseDown = false;

  clock: THREE.Clock = new THREE.Clock();

  currentIntersected: THREE.Object3D;

  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true
  });

  constructor(
    public translate: TranslateService,
    private _element: ElementRef,
    private _threeComponentService: ThreeComponentService
  ) {
    // Empty
  }

  public ngOnInit(): void {
    this._threeComponentModel = this._threeComponentService.initModel(
      this._element,
      this.options
    );
    this._threeComponentService.resetWidthHeight(
      this._threeComponentModel,
      window.innerWidth,
      window.innerHeight
    );
    this._threeComponentService.initComponent(this._threeComponentModel);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._threeComponentService.onChanges(this._threeComponentModel, changes);
  }

  public ngOnDestroy(): void {
    if (this._threeComponentModel.frameId != null) {
      cancelAnimationFrame(this._threeComponentModel.frameId);
    }
  }

  public get threeComponentModel(): ThreeComponentModel {
    return this._threeComponentModel;
  }
}
