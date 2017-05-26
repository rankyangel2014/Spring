$(document).ready(
        function() {

          // 保留两位小数
          var fixed2 = function(val) {
            return val.toFixed(2);
          }

          // 加百分号
          var fixed2percentage = function(val) {
            return fixed2(val) + '%';
          }
          // 高亮
          var highliht = function(val) {
            if (val > 0) {
              return '<span style="color: #b00">' + fixed2(val) + '</span>';
            } else if (val < 0) { return '<span style="color: #0b0">'
                    + fixed2(val) + '</span>'; }
            return fixed2(val);
          };

          // 列
          var colss = [
              {
                title: 'ID',
                name: 'id',
                width: 0,
                align: 'center',
                sortable: true,
                hidden: true
              },
              {
                title: 'ID',
                name: 'tid',
                width: 0,
                align: 'center',
                sortable: true,
                hidden: true
              },
              {
                title: '影片名称',
                name: 'filmName',
                align: 'center',
                sortable: true
              },
              {
                title: '出       演',
                name: 'actorName',
                align: 'center',
                sortable: true
              },
              {
                title: '影片格式',
                name: 'filmExt',
                align: 'center',
                sortable: true
              },
              {
                title: '影片大小',
                name: 'filmSize',
                align: 'center',
                sortable: true
              },
              {
                title: '影片時長',
                name: 'filmDuration',
                align: 'center',
                sortable: true
              },
              {
                title: '是否有碼',
                name: 'markInfo',
                align: 'center',
                sortable: true,
                hidden: true
              },
              {
                title: '发行日期',
                name: 'releaseTime',
                align: 'center',
                sortable: true
              },
              {
                title: '种子期限',
                name: 'torrentTerm',
                align: 'center',
                sortable: true,
                hidden: true
              },
              {
                title: '番号',
                name: 'serialNo',
                align: 'center',
                sortable: true,
                hidden: true
              },
              {
                title: '预览',
                name: 'filmCover',
                align: 'center',
                sortable: true,
                renderer: function(value) {
                  return "<a class='showimage' target='_blank' href='" + value
                          + "'>预览图</a>";
                }
              }, {
                title: '种子文件',
                name: 'filmTorrent',
                align: 'center',
                sortable: true,
                hidden: true,
                renderer: function(value) {
                  return "<a href='" + value + "'>获取种子</a>";
                }

              }, {
                title: '操作',
                name: 'opeator',
                align: 'center',
                sortable: true,
                renderer: function(value) {
                  return "查看更多图片";
                }
              }, {
                title: '来源',
                name: 'source',
                align: 'center',
                sortable: true,
                hidden: true
              }];
          // 分页
          var grid = $('#table11-1').mmGrid({
            width: 'auto',
            height: '40%',
            indexCol: false,
            checkCol: false,
            multiSelect: false,
            fullWidthRows: true,
            cols: colss,
            url: 'getAllFilm',
            method: 'get',
            root: 'root',
            autoLoad: true,
            remoteSort: true,
            sortName: 'id',
            sortStatus: 'asc',
            plugins: [$('#paginator11-1').mmPaginator()]
          });
          grid.on("cellSelected", function(e, item, rowIndex, colIndex) {
            if (colIndex == 13) {
              layer.open({
                type: 2// Page层类型
                ,
                area: ['1200px', '900px'],
                title: '',
                shade: 0.6 // 遮罩透明度
                ,
                maxmin: false // 允许全屏最小化
                ,
                anim: 1 // 0-6的动画形式，-1不开启
                ,
                content: 'lightgallery.html?' + item['tid']
              });
            }

          });
        });
