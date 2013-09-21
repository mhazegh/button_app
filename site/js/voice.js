$(document).ready(function(){
    var audio = $("#audio").get(0);
    var canvas = $("#canvas");
    var container = $(canvas).parent();
    var height;
    var width;
    var length;
	var channels;
	var rate;
    var wait_time;
	var waiting = 0;
    
    var context = canvas.get(0).getContext("2d");
	audio.addEventListener("MozAudioAvailable", drawWaveform, false);
	audio.addEventListener("loadedmetadata", getAudioData, false);

    $(window).resize(resizeCanvas);
    resizeCanvas();

    function resizeCanvas(){
        canvas.attr('width', $(container).width());
        canvas.attr('height', $(container).height());
        width = $(container).width();
        height = $(container).height();
    }

	function getAudioData() {
		rate = audio.mozSampleRate;
		channels = audio.mozChannels;
		length = audio.mozFrameBufferLength;
        wait_time = audio.duration*1000;
	}
	
	function drawWaveform(event) {
        if(waiting === 0)
        {
            setTimeout(function(){
                document.location.href = "http://www.google.com";
            }, wait_time);
            waiting = 1;
        }
		var data = event.frameBuffer;
		var samples = length / 4;
		var step = (length / channels) / samples;
		context.fillRect(0,0,width,height);
		context.strokeStyle = "#ff0000";
		context.lineWidth = 3;
		context.beginPath();
		for (var i=0; i<samples;i++) {
            context.lineTo(i*(width/samples), height/2 - data[i*step] * 200);
        }
		context.stroke();
	}
});
