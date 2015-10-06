//"use strict";

/*define(["jquery", "video"], function () {
	/**
	 * Object.create polyfill.
	 */
	if (!Object.create) {
		Object.create = function (o) {
			function F() { }
			F.prototype = o;
			return new F();
		};
	}

	var isIE8 = $("html.ie8").size() > 0,
		isAndroidBrowser = window.navigator.userAgent.indexOf("Android") > -1;

	/**
	 * detroitvideo object.
	 */
	var detroitvideo = {
		$container: null,
		videoRatio: null,
		$wrapper: null,

		init: function (container) {
			var that = this,
				$video = null,
				$poster = null,
				video = null;

			that.$container = $(container);
			$video = that.$container.find("video");
			that.videoRatio = $video.attr("width") / $video.attr("height");
			$poster = that.$container.find("img");
			
			$video.wrap('<div class="detroitvideo"></div>');


			that.$wrapper = $(".detroitvideo");
			$(".detroitvideo").append($poster);
			//that.$wrapper = $("<div>").addClass("detroitvideo");

			//that.$wrapper.append($video);
			//that.$container.append(that.$wrapper);

			/*if (!isIE8 && !isAndroidBrowser) {
				video = _V_("promo-video", {
					controls: false
				}, function () {
					this.on("play", function () {
						that.$wrapper.addClass("playing");
					});
				});
			}*/
			$video.get(0).play();
			that.refresh();
		},

		refresh: function () {
			var containerWidth = this.$container.width(),
				containerHeight = this.$container.height(),
				containerRatio = containerWidth / containerHeight,
				width = null,
				height = null,
				marginTop = 0,
				marginLeft = 0;

			if (containerRatio < this.videoRatio) {
				height = containerHeight;
				width = height * this.videoRatio;
				marginLeft = Math.ceil((containerWidth - width) / 2);
			} else {
				width = containerWidth;
				height = width / this.videoRatio;
				marginTop = Math.ceil((containerHeight - height) / 2);
			}

			this.$wrapper.css({
				width: width,
				height: height,
				marginTop: marginTop,
				marginLeft: marginLeft
			});
		},

		create: function (container) {
			var video = Object.create(detroitvideo);
			video.init(container);
			return video;
		}
	};

	/**
	 * detroitvideo jQuery plugin.
	 */
	$.fn.detroitvideo = function () {
		var args = Array.prototype.slice.apply(arguments),
			func = args[0];

		this.each(function () {
			var $this = $(this),
				video = $this.data("detroitvideo");
			
			if (video) {
				if ($.isFunction(video[func])) {
					var arg = Array.prototype.slice.call(args, 1);
					video[func].apply(video, arg);
				}
			} else {
				video = detroitvideo.create(this);
				$this.data("detroitvideo", video);
			}
		});

		return this;
	};
//});