import { Injectable, AfterViewInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService implements AfterViewInit {

  private scripts = [
    { src: '/build/js/custom.js', integrity: '', crossorigin: '' }
  ];

  constructor() { }

  ngAfterViewInit() {
    // Load scripts sequentially
    this.loadScripts();
  }

  public loadScript(src: string, integrity: string = '', crossorigin: string = ''): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      if (integrity) script.integrity = integrity;
      if (crossorigin) script.crossOrigin = crossorigin;
      script.onload = () => resolve();
      script.onerror = (error) => reject(new Error(`Script load error: ${src}`));
      document.body.appendChild(script);
    });
  }

  public loadScripts() {
    this.scripts.reduce((promise, script) => {
      return promise.then(() => this.loadScript(script.src, script.integrity, script.crossorigin));
    }, Promise.resolve());
  }
}
