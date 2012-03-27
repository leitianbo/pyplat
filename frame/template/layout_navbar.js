$(document).ready(function(){
    var navbar_data = {{ navbar_data|safe }}
    var navbar = $('#navbar');
    
    for(var i=0; i<navbar_data.length; i++){
        var module = navbar_data[i];

        var module_li = $('<li class="dropdown"></li>').appendTo(navbar);
        var module_a = $('<a href="#" class="dropdown-toggle" data-toggle="dropdown"></a>').text(module.name).appendTo(module_li);
        var module_b = $('<b class="caret"></b>').appendTo(module_a);
        var menu_ul = $('<ul class="dropdown-menu"></ul>').appendTo(module_li);

        var items = module.items || [];
        for(var j=0; j<items.length; j++){
            var item = items[j];
            var item_li = $('<li></li>').appendTo(menu_ul);
            var item_a = $('<a></a>').text(item.name).attr('href', item.url).appendTo(item_li);
        }
    }

    $('.dropdown-toggle').dropdown();
});
