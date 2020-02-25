/// <reference types="Cypress" />

beforeEach(() => {
  // Create an image proxy to handle intercepting
  // analytics calls.
  cy.on('window:before:load', (win) => {

    const NativeImage = Image;

    class AnalyticsInterceptingImage {
      constructor(w, h) {
        const nativeImage = new NativeImage(w, h);
        const handler = {
          set: function (obj, prop, value) {
            if (prop === 'src') {
              // TODO: Filter out non Adobe URLs
              // TODO: Make this a nice analytics object...
              let event = new CustomEvent('analyticsCall', {
                detail: value
              });
              win.document.dispatchEvent(event);
            }
            return nativeImage[prop] = value;
          },
          get: function (target, prop) {
            let result = target[prop];
            if (typeof result === 'function') {
              result = result.bind(target);
            }
            return result;
          }
        };
        const prox = new Proxy(nativeImage, handler);
        try {
          prox[Symbol.toStringTag] = 'HTMLImageElement';
        } catch (e) {}
        return prox;
      }
    }

    AnalyticsInterceptingImage.prototype[Symbol.toStringTag] = NativeImage.prototype.toString();

    Object.defineProperty(AnalyticsInterceptingImage, 'name', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: 'Image'
    });

    if ('toSource' in NativeImage) { // FF extra
      Object.defineProperty(AnalyticsInterceptingImage, 'toSource', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: function () {
          return NativeImage.toSource();
        }
      });
    }

    Object.defineProperty(AnalyticsInterceptingImage, 'toString', {
      enumerable: true,
      configurable: false,
      writable: true,
      value: function () {
        return NativeImage.toString();
      }
    });

    win.Image = AnalyticsInterceptingImage;
  })

});