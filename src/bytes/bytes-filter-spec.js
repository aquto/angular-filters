describe('Filter: bytes', function() {
    beforeEach(module('angular-filters'));

    // initialize a new instance of the filter before each test
    var byte;
    beforeEach(inject(function ($filter) {
        byte = $filter('bytes');
    }));

    it('should return nothing when there is no filesize', function () {
        expect(byte('text')).toBe('-');
    });

    it('should return 0 B when bytes are 0', function () {
        expect(byte(0)).toBe('0 B');
    });

    it('should return 0 MB when bytes are 0 and minUnit is MB', function () {
        expect(byte(0, { minUnit: 'MB' })).toBe('0 MB');
    });

    it('should round the filesize based on the configured precision', function () {
        var size = 1024 + 512;
        expect(byte(size)).toBe('1.5 kB');
        expect(byte(size, 2)).toBe('1.50 kB');
        expect(byte(size, { precision: 2 })).toBe('1.50 kB');
        expect(byte(size, { precision: 2, minUnit: 'kB' })).toBe('1.50 kB');
    });

    it('should recognize negative byte', function () {
        expect(byte(-1, 0)).toBe('-1 B');
    });

    it('should recognize byte', function () {
        expect(byte(1, 0)).toBe('1 B');
    });

    it('should recognize kilobyte', function () {
        expect(byte(Math.pow(1024, 1), 0)).toBe('1 kB');
    });

    it('should recognize megabyte', function () {
        expect(byte(Math.pow(1024, 2), 0)).toBe('1 MB');
    });

    it('should recognize gigabyte', function () {
        expect(byte(Math.pow(1024, 3), 0)).toBe('1 GB');
    });

    it('should recognize terabyte', function () {
        expect(byte(Math.pow(1024, 4), 0)).toBe('1 TB');
    });

    it('should recognize petabyte', function () {
        expect(byte(Math.pow(1024, 5), 0)).toBe('1 PB');
    });

    it('should recognize exabyte', function () {
        expect(byte(Math.pow(1024, 6), 0)).toBe('1 EB');
    });

    it('should recognize zettabyte', function () {
        expect(byte(Math.pow(1024, 7), 0)).toBe('1 ZB');
    });

    it('should recognize yottabyte', function () {
        expect(byte(Math.pow(1024, 8), 0)).toBe('1 YB');
    });

    it('should recognize minUnit of kB', function () {
        expect(byte(300, { minUnit: 'kB' })).toBe('< 1 kB');
    });

    it('should recognize minUnit of MB', function () {
        expect(byte(300*Math.pow(1024, 1), { minUnit: 'MB' })).toBe('< 1 MB');
    });

    it('should recognize minUnit of GB', function () {
        expect(byte(300*Math.pow(1024, 2), { minUnit: 'GB' })).toBe('< 1 GB');
    });

    it('should recognize minUnit of TB', function () {
        expect(byte(300*Math.pow(1024, 3), { minUnit: 'TB' })).toBe('< 1 TB');
    });

    it('should recognize minUnit of PB', function () {
        expect(byte(300*Math.pow(1024, 4), { minUnit: 'PB' })).toBe('< 1 PB');
    });

    it('should recognize minUnit of EB', function () {
        expect(byte(300*Math.pow(1024, 5), { minUnit: 'EB' })).toBe('< 1 EB');
    });

    it('should recognize minUnit of ZB', function () {
        expect(byte(300*Math.pow(1024, 6), { minUnit: 'ZB' })).toBe('< 1 ZB');
    });

    it('should recognize minUnit of YB', function () {
        expect(byte(300*Math.pow(1024, 7), { minUnit: 'YB' })).toBe('< 1 YB');
    });
});
