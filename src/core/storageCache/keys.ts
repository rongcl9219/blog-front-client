const KEYS: GIObject = {
        commentUser: 'commentUser',
        theme: 'adminTheme'
    },
    NameSpace = 'BLOG_FRONT';

for (const key in KEYS) {
    if (Object.prototype.hasOwnProperty.call(KEYS, key)) {
        KEYS[key] = `${NameSpace}:${key}`.toUpperCase();
    }
}

export default KEYS;
