import { Injectable, ViewChild, ElementRef } from '@angular/core';

function _window() : any {
   return window;
}

@Injectable()
export class WindowService {
    private _headerHeight;
    private _videoHeight = window.innerHeight;


    set headerHeight(height){
        this._headerHeight = height;
    }

    get videoHeight(): any{
        return this._videoHeight - this._headerHeight;
    }
}