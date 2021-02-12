
# Vue Keyframes
is a Vue.js plugin for a simple *vertical scroll* elements style animation with an out-of-box keyframe interpolation
(Any "interpolable" style is supported via [d3-interpolate](https://github.com/d3/d3-interpolate) module)

## ESM usage

    npm add vue-style-keyframes --save-dev
    
app.js

    import Vue 
    import VueKeyframes from "vue-style-keyframes";
    
    const overrideCustomOptions = {};
    Vue.use(VueKeyframes, overrideCustomOptions);

## CDN usage
index.html

    <div id="vue-instance">
	    <div v-keyframes=="{ pxOffset: -400 }">
		    <!-- defined keyframes with jsonString -->
		    <img data-keyframes='{"0":{"opacity":0},"100":{"opacity":1}}'>

		    <!-- or via dynamic values -->
		    <img :data-keyframe="JSON.stringify(sampleKeyFrames)">
	    </div>
    </div>
    
    <script  src="//cdn.jsdelivr.net/gh/Gaspadlo/vue-keyframes@0/dist/vue.keyframes.umd.min.js"  type="application/javascript"></script>
    <script  type="application/javascript"  defer>
	    Vue.use(VueKeyframes);
	    new  Vue({
		    el:  '#vue-instance',
		    data() {
			    return {
				    sampleKeyFrames: {
					    0: { opacity: 0 },
					    100: { opacity: 1 }
				    }
			    };
		    },
	    });
    </script>


**@TODO: actually finish readme and options list with descriptions and examples**
