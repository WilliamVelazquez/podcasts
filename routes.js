const routes = require('next-routes')

                                                                    // Name     Page      Pattern
module.exports = routes()                                           // ----     ----      -----
.add('about')                                                       // about    about     /about
.add('index')                                                       // index    index     /index
.add('channel', '/:slug.:id', 'channel')                            // channel  channel   /channel.id
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')    // channel  channel   /channel.id

                                                       // Name     Page      Pattern
// .add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
// .add('user', '/user/:id', 'profile')                // user     profile   /user/:id
// .add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none)   complex   /:noname/:lang(en|es)/:wow+
// .add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta     v3        /v3