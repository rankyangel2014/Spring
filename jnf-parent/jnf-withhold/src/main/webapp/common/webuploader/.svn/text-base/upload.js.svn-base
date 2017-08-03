appframe.loadCss("/common/webuploader/webuploader.css", "WebUploaderCss");
appframe.loadCss("/common/webuploader/upload.css", "uploadCss");

/**
 * 用法： step 1，在depend.ext.xml 中加入如下依赖：
 * <dependJs>/common/jquery/1.11.1/jquery.min.js</dependJs>
 * <dependJs>/common/webuploader/webuploader.js</dependJs>
 * <dependJs>/common/webuploader/upload.js</dependJs>
 * 
 * step 2，新增一个id属性为（uploadFile.ClassName）的Panel在panel的afterrender事件触发后调用初始化方法：
 * 例如： Ext.getCmp('uploadFile.ClassName').on('afterrender',function(thisPanel){
 * if(thisPanel){
 * com.jsjn.uploader.initWebUpload(thisPanel.id,{fileNumLimit:1}); } });
 */
fileList = [];
(function($, window) {
	Ext.namespace('com.jsjn.uploader');

	/**
	 * 查看原图
	 */
	com.jsjn.uploader.showImage = function(filePath) {
		var showImageWin = new Ext.Window({
					title : "查看原图",
					modal : true,
					draggable : true,
					width : 600,
					height : 400,
					layout : 'fit',
					closeAction : 'close',
					autoScroll : true,
					html : "<img  src="
							+ "fileServer.do?method=getfile&filepath="
							+ filePath + "></img>"
				});
		showImageWin.show();
	};

	com.jsjn.uploader.initWebUpload = function(extPanelId, options) {

		var wrapperId = Ext.id(), uploaderId = Ext.id(), dndAreaId = Ext.id(), filePickerId = Ext
				.id(), filePicker2Id = Ext.id();
		var target = $('#' + Ext.getCmp(extPanelId).body.id);
		var mulple="";
		// 主要的容器
			if(options.fileNumLimit>1){
				mulple='<div class="btns"><div id="'+filePicker2Id+'"></div></div>';
			}
		var wrapper = '<div id="'+wrapperId+'" class="uploadcomp'+options.sign+'">' + '<div class="container">'
				+ '<div id="'+uploaderId+'">' + '<div class="queueList">'
				+ '<div id="'+dndAreaId+'" class="placeholder" name="'+options.sign+'">'
				+ '<div id="'+filePickerId+'"></div>' + '</div>' + '</div>'
				+ '<div class="statusBar" style="display:none;">'
				+ '<div class="progress">' + '<span class="text">0%</span>'
				+ '<span class="percentage"></span>'
				+ '</div><div class="info"></div>' 
				+mulple
//				+ '<div class="btns">'
//				+ '<div id="'+filePicker2Id+'"></div>' // <div
//													// class="uploadBtn">开始上传</div>
//				+ '</div>' 
				+ '</div>' + '</div>' + '</div>' + '</div>';
		target.append(wrapper);

		var $wrap = $('#'+uploaderId),

		// 图片容器
		$queue = $('<ul class="filelist"></ul>').appendTo($wrap
				.find('.queueList')),

		// 状态栏，包括进度和控制按钮
		$statusBar = $wrap.find('.statusBar'),

		// 文件总体选择信息。
		$info = $statusBar.find('.info'),

		// 上传按钮
		// $upload = $wrap.find( '.uploadBtn' ),

		// 没选择文件之前的内容。
		$placeHolder = $wrap.find('.placeholder'),

		$progress = $statusBar.find('.progress').hide(),

		// 添加的文件数量
		fileCount = 0,

		// 添加的文件总大小
		fileSize = 0,

		// 优化retina, 在retina下这个值是2
		ratio = window.devicePixelRatio || 1,

		// 缩略图大小
		thumbnailWidth = 110 * ratio, thumbnailHeight = 110 * ratio,
		// 可能有pedding, ready, uploading, confirm, done.
		state = 'pedding',

		// 所有文件的进度信息，key为file id
		percentages = {},
		// 判断浏览器是否支持图片的base64
		isSupportBase64 = (function() {
			var data = new Image();
			var support = true;
			data.onload = data.onerror = function() {
				if (this.width != 1 || this.height != 1) {
					support = false;
				}
			};
			data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			return support;
		})(),

		supportTransition = (function() {
			var s = document.createElement('p').style, r = 'transition' in s
					|| 'WebkitTransition' in s || 'MozTransition' in s
					|| 'msTransition' in s || 'OTransition' in s;
			s = null;
			return r;
		})(),

		// WebUploader实例
		uploader;

		if (!WebUploader.Uploader.support()) {
			Ext.Msg.alert('系统提示',
					'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
			throw new Error('WebUploader does not support the browser you are using.');
		}

		// 实例化
		uploader = WebUploader.create({
			auto : true,
			compress : false,
			resize : false,
			pick : {
				id : '#' + filePickerId,
				label : options.btnName
			},
			runtimeOrder : 'flash',
			formData : {
				maxSize : 8 * 1024 * 1024
			},
			// dnd: '#dndArea',
			paste : '#' + uploaderId,
			swf : appConfig.baseUrl + '/common/webuploader/Uploader.swf',
			chunked : false,
			chunkSize : 512 * 1024,
			server : appConfig.baseUrl
					+ '/com.jsjn.platform.file.FileUploader.do?method=upLoadFile',
			accept : {
				title : 'Images',
				extensions : options.extensions
						? options.extensions
						: 'jpg,jpeg,bmp,png',
				mimeTypes : options.mimeTypes ? options.mimeTypes : 'image/*'
			},

			// 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
			disableGlobalDnd : true,
			fileNumLimit : options.fileNumLimit || 10,
			fileSingleSizeLimit : 8 * 1024 * 1024
				// 8M
		});

		// 拖拽时不接受 js, txt 文件。
		// uploader.on( 'dndAccept', function( items ) {
		// var denied = false,
		// len = items.length,
		// i = 0,
		// // 修改js类型
		// unAllowed = 'text/plain;application/javascript ';
		//
		// for ( ; i < len; i++ ) {
		// // 如果在列表里面
		// if ( ~unAllowed.indexOf( items[ i ].type ) ) {
		// denied = true;
		// break;
		// }
		// }
		//
		// return !denied;
		// });

		// uploader.on('dialogOpen', function() {
		// console.log('here');
		// });

		// 添加“添加文件”的按钮，
		uploader.addButton({
					id : '#' + filePicker2Id,
					label : '继续添加'
				});

		uploader.on('ready', function() {
					window.uploader = uploader;
				});

		// 当有文件添加进来时执行，负责view的创建
		function addFile(file) {
			var $li = $('<li id="' + file.id + '">' + '<p class="imgWrap"></p>'
					+ '<p class="progress"><span></span></p>' + '</li>'),

			$btns = $('<div class="file-panel">'
					+ '<span class="cancel">删除</span>'
					+ '<span class="rotateRight">向右旋转</span>'
					+ '<span class="rotateLeft">向左旋转</span></div>')
					.appendTo($li), $prgress = $li.find('p.progress span'), $wrap = $li
					.find('p.imgWrap'), $info = $('<p class="error"></p>'),

			showError = function(code) {
				switch (code) {
					case 'exceed_size' :
						text = '文件大小超出';
						break;

					case 'interrupt' :
						text = '上传暂停';
						break;

					default :
						text = '上传失败，请重试';
						break;
				}

				$info.text(text).appendTo($li);
			};

			if (file.getStatus() === 'invalid') {
				showError(file.statusText);
			} else {
				// @todo lazyload
				if (file.ext == 'pdf') {
					var a = $("<a target='_blank'>" + file.name + "</a>");
					$wrap.empty().append(a);
				} else {
					uploader.makeThumb(file, function(error, src) {
								var img;
								if (error) {
									$wrap.text("不能预览");
									return;
								}

								if (isSupportBase64) {
									img = $('<img src="' + src + '">');

									$wrap.empty().append(img);
								} else {
									$wrap.text("预览出错");
								}
							}, thumbnailWidth, thumbnailHeight);

				}
				percentages[file.id] = [file.size, 0];
				file.rotation = 0;
			}

			file.on('statuschange', function(cur, prev) {
						if (prev === 'progress') {
							$prgress.hide().width(0);
						}

						// 成功
						if (cur === 'error' || cur === 'invalid') {
							showError(file.statusText);
							percentages[file.id][1] = 1;
						} else if (cur === 'interrupt') {
							showError('interrupt');
						} else if (cur === 'queued') {
							$info.remove();
							$prgress.css('display', 'block');
							percentages[file.id][1] = 0;
						} else if (cur === 'progress') {
							$info.remove();
							$prgress.css('display', 'block');
						} else if (cur === 'complete') {
							$prgress.hide().width(0);
							$li.append('<span class="success"></span>');
						}

						$li.removeClass('state-' + prev).addClass('state-'
								+ cur);
					});

			$li.on('mouseenter', function() {
						$btns.stop().animate({
									height : 30
								});
					});

			$li.on('mouseleave', function() {
						$btns.stop().animate({
									height : 0
								});
					});

			$btns.on('click', 'span', function() {
						var index = $(this).index(), deg;

						switch (index) {
							case 0 :
								uploader.removeFile(file);
								return;

							case 1 :
								file.rotation += 90;
								break;

							case 2 :
								file.rotation -= 90;
								break;
						}

						if (supportTransition) {
							deg = 'rotate(' + file.rotation + 'deg)';
							$wrap.css({
										'-webkit-transform' : deg,
										'-mos-transform' : deg,
										'-o-transform' : deg,
										'transform' : deg
									});
						} else {
							$wrap
									.css('filter',
											'progid:DXImageTransform.Microsoft.BasicImage(rotation='
													+ (~~((file.rotation / 90)
															% 4 + 4) % 4) + ')');
						}

					});

			$li.appendTo($queue);

		}
		function updateAttach(aim) {
			$("."+aim+"image").remove();
		}
		// 负责view的销毁
		function removeFile(file) {
			var $li = $('#' + file.id);

			delete percentages[file.id];
			updateTotalProgress();
			$li.off().find('.file-panel').off().end().remove();
		}

		function updateTotalProgress() {
			var loaded = 0, total = 0, spans = $progress.children(), percent;

			$.each(percentages, function(k, v) {
						total += v[0];
						loaded += v[0] * v[1];
					});

			percent = total ? loaded / total : 0;

			spans.eq(0).text(Math.round(percent * 100) + '%');
			spans.eq(1).css('width', Math.round(percent * 100) + '%');
			updateStatus();
		}

		function updateStatus() {
			var text = '', stats;

			if (state === 'ready') {
				text = '选中' + fileCount + '张图片，共'
						+ WebUploader.formatSize(fileSize) + '。';
			} else if (state === 'confirm') {
				stats = uploader.getStats();
				if (stats.uploadFailNum) {
					text = stats.uploadFailNum + '张照片上传失败。';
				}

			} else {
				stats = uploader.getStats();
				text = '共' + fileCount + '张（'
						+ WebUploader.formatSize(fileSize) + '）。';

				if (stats.uploadFailNum) {
					text += '，失败' + stats.uploadFailNum + '张。';
				}
			}

			$info.html(text);
		}

		function setState(val) {
			var stats;

			if (val === state) {
				return;
			}
			state = val;

			switch (state) {
				case 'pedding' :
					$placeHolder.removeClass('element-invisible');
					$queue.hide();
					$statusBar.addClass('element-invisible');
					uploader.refresh();
					break;

				case 'ready' :
					$placeHolder.addClass('element-invisible');
					$('#' + filePicker2Id).removeClass('element-invisible');
					$queue.show();
					$statusBar.removeClass('element-invisible');
					uploader.refresh();
					break;

				case 'uploading' :
					$('#' + filePicker2Id).addClass('element-invisible');
					$progress.show();
					break;

				case 'paused' :
					$progress.show();
					break;

				case 'confirm' :
					$progress.hide();
					$('#' + filePicker2Id).removeClass('element-invisible');

					stats = uploader.getStats();
					if (stats.successNum && !stats.uploadFailNum) {
						setState('finish');
						return;
					}
					break;
				case 'finish' :
					stats = uploader.getStats();
					if (options.type == 'update') {
						updateAttach(options.sign);
					}
					if (!stats.successNum) {
						// 没有成功的图片，重设
						state = 'done';
						location.reload();
					}
					break;
			}

			updateStatus();
		}

		uploader.onUploadProgress = function(file, percentage) {
			var $li = $('#' + file.id), $percent = $li.find('.progress span');

			$percent.css('width', percentage * 100 + '%');
			percentages[file.id][1] = percentage;
			updateTotalProgress();
		};

		uploader.onFileQueued = function(file) {
			fileCount++;
			fileSize += file.size;

			if (fileCount === 1) {
				$placeHolder.addClass('element-invisible');
				$statusBar.show();
			}

			addFile(file);
			setState('ready');
			updateTotalProgress();
		};

		uploader.onFileDequeued = function(file) {
			fileCount--;
			fileSize -= file.size;

			if (!fileCount) {
				setState('pedding');
			}

			removeFile(file);
			updateTotalProgress();

		};

		uploader.on('all', function(type) {
					switch (type) {
						case 'uploadFinished' :
							setState('confirm');
							break;

						case 'startUpload' :
							setState('uploading');
							break;

						case 'stopUpload' :
							setState('paused');
							break;

					}
				});

		uploader.onError = function(type) {
			var text;
			switch (type) {
				case 'Q_TYPE_DENIED' :
					text = '请上传jpg,jpeg,bmp,png格式文件！';
					break;
				//	
				// case 'Q_EXCEED_SIZE_LIMIT':
				// text = '文件总大小超出100M！';
				// break;
				case 'F_EXCEED_SIZE' :
					text = '单个文件大小超出8M！';
					break;
				case 'F_DUPLICATE' :
					text = '文件重复！';
					break;
				case 'Q_EXCEED_NUM_LIMIT' :
					text = '文件个数超出'.concat(options.fileNumLimit || 10) + '！';
					break;
				default :
					text = '上传失败，请重试';
					break;
			}
			Ext.Msg.alert('系统提示', text);
		};

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.onUploadSuccess = function(file, response) {
			var url = "";
			if (response.dataURI) {// 图片
				url = response.dataURI.replace('weedfs/', '');
				var image = $('#' + file.id).find('img');
				image.attr('name', file.name + "#" + url);
				image.click(function() {
							com.jsjn.uploader.showImage(url);
						});
			} else {// pdf
				url = response.filePath.replace('weedfs/', '');
				var a = $('#' + file.id).find('a');
				a.attr('name', file.name + "#" + url);
				a.attr('href', "fileServer.do?method=getfile&filepath=" + url
								+ "&fileName=" + file.name);
			}
		};

		updateTotalProgress();
		return uploader;
	};

})(jQuery, window);