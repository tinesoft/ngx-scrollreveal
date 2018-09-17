import { NgsRevealConfig } from './ngs-reveal-config';

describe('ngs-reveal-config', () => {
    it('should have sensible default values', () => {
        const config = new NgsRevealConfig();

        expect(config.origin).toBe('bottom');
        expect(config.distance).toBe('0px');
        expect(config.duration).toBe(600);
        expect(config.delay).toBe(0);
        expect(config.rotate).toEqual({ x: 0, y: 0, z: 0 });
        expect(config.opacity).toBe(0);
        expect(config.scale).toBe(0.9);
        expect(config.easing).toBe('cubic-bezier(0.5, 0, 0, 1)');
        expect(config.container).toBeUndefined();
        expect(config.mobile).toBe(true);
        expect(config.desktop).toBe(true);
        expect(config.reset).toBe(false);
        expect(config.useDelay).toBe('always');
        expect(config.viewFactor).toBe(0.2);
        expect(config.viewOffset).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
    });
});
