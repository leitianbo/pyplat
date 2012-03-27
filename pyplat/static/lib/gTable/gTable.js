(function(){
    if(window.gTable)return;
    /**
     * 通过分析th, 从Table中获取Meta数据
     */
    var getMeta = function(table){
        var meta = [];
        var thes = table.find('thead > tr > th');
        for(var i=0; i<thes.size(); i++){
            var th = $(thes.get(i));
            meta.push({
                'key': th.attr('key'),
                'type': th.attr('type'),
                'hyperlink-target': th.attr('hyperlink-target')
            });
        }
        return meta;
    };

    /**
     * checkbox 的 渲染器
     */
    var checkbox_render = function(parent, key, meta, row_index, row_data){
        return $("<input id='"+key+"-"+row_index+"' name='"+key+"' type='checkbox'/>")
        .bind(
            'click', 
            {
                'key': key,
                'row_index': row_index,
                'row_data': row_data
            }, 
            function(event){
                event.data.row_data[event.data.key] = this.checked;
            }
        );
    };

    /**
     * text 的 渲染器
     */
    var text_render = function(parent, key, meta, row_index, row_data){
        return $("<span style='vertical-align:middle'></span>").text(row_data[key])
        .bind(
            'click',
            {
            },
            function(event){
                var span = $(this).hide();

                var textinput = $("<input type='text' style='padding:0px;margin:0px;'/>").val(span.text())
                .bind('blur', function(){
                    span.text($(this).val()).show();
                    $(this).remove();
                }).appendTo(parent).focus();
            }
        );
    };

    var hyperlink_render = function(parent, key, meta, row_index, row_data){
        var hyperlink = $("<a></a>").text(row_data[key]);
        var target = meta['hyperlink-target'];

        hyperlink.attr('href', eval(target));

        return hyperlink;
    };

    /**
     * 构造函数
     */
    var gTable = window.gTable = function(id, options){
        var table = $(id);
        var metas = getMeta(table);

        var tbody = $("<tbody></tbody>").appendTo(table);
        for(var i=0; i<options.data.length; i++){
            var tr = $("<tr></tr>").appendTo(tbody);

            var row_data = options.data[i];

            for(var j=0; j<metas.length; j++){
                var meta = metas[j];
                var td = $("<td></td>");

                if(meta.type === 'checkbox'){
                    td.append(checkbox_render(td, meta.key, meta, i, row_data));
                }else if(meta.type === 'text'){
                    td.append(text_render(td, meta.key, meta, i, row_data));
                }else if(meta.type === 'hyperlink'){
                    td.append(hyperlink_render(td, meta.key, meta, i, row_data));
                }else{
                    td.text(row_data[meta.key]);
                }
                td.appendTo(tr);
            }
        }
    };
})();

