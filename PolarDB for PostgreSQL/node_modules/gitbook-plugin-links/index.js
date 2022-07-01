var path = require('path')

module.exports = {
  book: {
    assets: './book',
    js: ['plugin.js'],
    css: ['plugin.css']
  },
  hooks: {
    'page': function (page) {
      if (this.config.options.generator !== 'website') {
        return page
      }

      var config = this.options.pluginsConfig['links'] || {}

      if (!config.links) {
        return page
      }

      config.links.forEach(function (link) {
        var label = link.label
        var icon = link.icon || 'fa fa-edit'
        var htmlLink = '<a class="links-link btn ' + icon + ' pull-left" href="' + link.url + '">&nbsp;&nbsp;' + label + '</a>'

        page.sections
          .filter(function (section) {
            return section.type === 'normal'
          })
          .forEach(function (section) {
            section.content = htmlLink + section.content;
          })
      })

      return page
    }
  }
}
