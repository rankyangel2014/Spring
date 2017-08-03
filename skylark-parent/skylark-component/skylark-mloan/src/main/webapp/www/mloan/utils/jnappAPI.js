(function(){
	
	"use strict";
	
	angular.module('jnappServices', ['ngCordova', 'LocalStorageModule'])
	
	.factory("jnappService", function(localStorageService, $cordovaCamera, $cordovaFileTransfer, $cordovaDevice){
		/**
		 * 汉王ocr接口。可以扫描身份证和名片。
		 */
		function hanvonOCR(type, source, suc, fail) {
			var sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			if(source == "A") {
				sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			} else if(source == "C") {
				sourceType = Camera.PictureSourceType.CAMERA;
			}
			
			var fun = navigator.hanvonOCR.scanID;
			if(type == "ID") {
				fun = navigator.hanvonOCR.scanID;
			} else if(type == "VC") {
				fun = navigator.hanvonOCR.scanVC;
			}
			
			var options = {
				      quality: 25,
				      destinationType: Camera.DestinationType.FILE_URI,
				      sourceType: sourceType,
				      allowEdit: false,
				      encodingType: Camera.EncodingType.JPEG,
				      saveToPhotoAlbum: false
			    };
			
			$cordovaCamera.getPicture(options).then(function(imageURI) {
				if($cordovaDevice.getPlatform() == 'Android') {
					fun(suc, fail, {
						filePath : imageURI
					});
				} else if($cordovaDevice.getPlatform() == 'iOS') {
					fun(suc, fail, imageURI);
				}
					
			    }, function(err) {
			    	//getPicture fail callback
			    	fail(err);
			    });
		}
		
		/**
		*上传图片(ngCordova)
		*/
		function uploadPicture(url, source, suc, fail, progress) {
			var sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			if(source == "A") {
				sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			} else if(source == "C") {
				sourceType = Camera.PictureSourceType.CAMERA;
			}
			
			navigator.camera.getPicture(function(imageURI) {
				var options = {};
				$cordovaFileTransfer.upload(url, imageURI, options)
			      .then(suc, fail, progress);
			}, function(msg) {
				//getPicture fail callback
			}, {
				quality : 50,
				saveToPhotoAlbum : true,
				sourceType : sourceType,
				mediaType : Camera.MediaType.PICTURE
			});
		}
		
		/**
		 * 打开推送客户端
		 * param:{
				serverIP : "172.31.210.70",//localStorageService.get("sysConfig.remoteConfig").push_server,
				serverPort : 9966,
				userId : "J3205810010010"
			}
		 */
		function startPushClient(success, fail, param) {
			navigator.pushClient.setup(success, fail, param);
		}
		
		/**
		 * 停止推送客户端
		 */
		function stopPushClient(success, fail) {
			navigator.pushClient.stop(success, fail, {});
		}
		
		/**
		 * 使用TSV-300A-1设备读取身份证卡信息
		 */
		function idcread(success, fail) {
			navigator.SFSB.scanID(success, fail);
		}
		
		return {
			hanvonOCR : hanvonOCR,
			uploadPicture : uploadPicture,
			startPushClient : startPushClient,
			stopPushClient : stopPushClient,
			idcread : idcread
		};
	});
	
})();
