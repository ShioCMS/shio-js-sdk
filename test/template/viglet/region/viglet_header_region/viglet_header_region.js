    var Handlebars = require('handlebars');
    var template = Handlebars.compile(html);

    var navigation = shObject.navigation("Viglet", true);
    
    var forEach = Array.prototype.forEach;
    var currentFolder = new String(shContent.system.id);
    var folders = [];

    forEach.call(navigation, function (shFolder) {
        var folderId = new String(shFolder.id);

        var isCurrentFolder = false;

        if (!currentFolder.localeCompare(folderId)) {
            isCurrentFolder = true;
        }

        var folder = {
            "name": shFolder.name,
            "link": shObject.generateFolderLink(shFolder.id),
            "current": isCurrentFolder
        }

        folders.push(folder);
    });

    html = template(folders);
    html
