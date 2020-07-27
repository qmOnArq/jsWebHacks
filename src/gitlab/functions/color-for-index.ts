export function colorForIndex(i: number, asString = true) {
    const values = HSVToRGB((i * 0.618033988749895) % 1.0, 0.5, Math.sqrt(1.0 - ((i * 0.618033988749895) % 0.5)));

    return asString ? `rgb(${values[0]}, ${values[1]}, ${values[2]})` : values;
}

function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(val, max));
}

function HSVToRGB(h: number, s: number, v: number) {
    if (s == 0) {
        return [v, v, v];
    }
    if (v == 0) {
        return [0, 0, 0];
    }
    const col = [0, 0, 0];
    const hval = h * 6;
    const sel = Math.floor(hval);
    const mod = hval - sel;
    const v1 = v * (1 - s);
    const v2 = v * (1 - s * mod);
    const v3 = v * (1 - s * (1 - mod));

    switch (sel + 1) {
        case 0:
            col[0] = v;
            col[1] = v1;
            col[2] = v2;
            break;
        case 1:
            col[0] = v;
            col[1] = v3;
            col[2] = v1;
            break;
        case 2:
            col[0] = v2;
            col[1] = v;
            col[2] = v1;
            break;
        case 3:
            col[0] = v1;
            col[1] = v;
            col[2] = v3;
            break;
        case 4:
            col[0] = v1;
            col[1] = v2;
            col[2] = v;
            break;
        case 5:
            col[0] = v3;
            col[1] = v1;
            col[2] = v;
            break;
        case 6:
            col[0] = v;
            col[1] = v1;
            col[2] = v2;
            break;
        case 7:
            col[0] = v;
            col[1] = v3;
            col[2] = v1;
            break;
    }

    col[0] = Math.floor(clamp(col[0], 0, 1) * 255);
    col[1] = Math.floor(clamp(col[1], 0, 1) * 255);
    col[2] = Math.floor(clamp(col[2], 0, 1) * 255);
    return col;
}
