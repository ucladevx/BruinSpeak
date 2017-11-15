function check(i,j, idk, idk2, right){

			if(i < 10 || i > 45){
				return false;
			}

			if(j < idk2 || j > right-idk2){
				return false;
			}

			// tower windows
			if(i > 14 && i < 19){

				// first tower, three windows
				if((j > idk + 30) && (j < idk + 60)){
					return false;
				}

				else if ((j > idk + 90) && (j < idk + 120)){
					return false;;
				}

				else if ((j > idk + 150) && (j < idk + 180)){
					return false;
				}

				// second tower, two windows
				else if ((j > (right - idk - 170)) && (j < (right - idk - 130))){
					return false;
				}

				else if ((j > (right - idk - 70)) && (j < (right - idk - 45))){
					return false;
				}
			}

			// bottom windows
			if(i > 39 && i < 43){

				// left side
				if((j > idk2 + 60) && (j < idk2 + 90)){
					return false;
				}

				else if((j > idk2 + 150) && (j < idk2 + 180)){
					return false;;
				}

				else if((j > idk2 + 230) && (j < idk2 + 260)){
					return false;
				}

				// right side
				else if((j > idk2 + 1035) && (j < idk2 + 1065)){
					return false;
				}

				else if((j > idk2 + 1125) && (j < idk2 + 1155)){
					return false;
				}

				else if((j > idk2 + 1215) && (j < idk2 + 1245)){
					return false;
				}
			}

			// center windows
			if(i > 32 && i < 40){
				if((j > idk + 215) && (j < idk + 260)){
					return false;
				}

				else if((j > idk + 395) && (j < idk + 440)){
					return false;
				}
			}

			// large window center
			if(i > 30 && i < 40){
				if((j > idk + 290) && (j < idk + 365)){
					return false;
				}
			}

			return true;
		}

		function checkBlue(i,j,idk,idk2,right){

			if(i > 11){

				if( (j > idk + 200) && (j < (right - idk-215)) && i < 28){
					return false;
				}

				if((j > idk) && (j < idk + 215) ){
					return true;
				}

				else if ( (j < (right - idk)) && (j > (right - idk - 200)) ){
					return true;
				}
			}

			// make center
			if(j > (right* 0.81)/2 && j < (right - (right* 0.81)/2) && i > 27){
				return true;
			}

			return false;
		}

		paper.install(window);

		window.onload = function() {

			var canvas = document.getElementById('paper');
			paper.setup(canvas);

			var circles = [];

			// var top = 0;
			// var left = 0;
			var right = window.innerWidth;
			var bottom = window.innerHeight;
			var idk = (right* 0.55)/2;
			var idk2 = (right* 0.10)/2;
			var radius = 3;

			for(var i = 0; i < 46; i++){
				for(var j = 0; j < right; j+= 15){

					if(!check(i,j,idk,idk2,right)){
						continue;
					}

					// make bottom rectangle
					if(j > idk2 && j < (right - idk2) && i > 35){

						var x = j;
						var y = i*15;

						var circle = new Path.Circle(new Point(x, y),radius);
						circle.strokeColor = 'black';
						circle.fillColor = 'black';
						circles.push(circle);
					}

					// make two towers
					if((j > idk) && (j < idk + 215) ){

						var x = j;
						var y = i*15;

						var circle = new Path.Circle(new Point(x, y),radius);
						circle.strokeColor = 'black';
						circle.fillColor = 'black';
						circles.push(circle);
					}

					else if ( (j < (right - idk)) && (j > (right - idk - 215)) ){
						var x = j;
						var y = i*15;

						var circle = new Path.Circle(new Point(x, y),radius);
						circle.strokeColor = 'black';
						circle.fillColor = 'black';
						circles.push(circle);
					}

					// make center
					if(j > (right* 0.81)/2 && j < (right - (right* 0.81)/2) && i > 25){

						var x = j;
						var y = i*15;

						var circle = new Path.Circle(new Point(x, y),radius);
						circle.strokeColor = 'black';
						circle.fillColor = 'black';
						circles.push(circle);
					}

					// make smaller center in blue

					// make two towers
					if(i > 11){

						if( (j > idk + 200) && (j < (right - idk-215)) && i < 28){
							continue;
						}

						if((j > idk) && (j < idk + 215) ){

							var x = j;
							var y = i*15;

							var circle = new Path.Circle(new Point(x, y),radius);
							circle.strokeColor = 'blue';
							circle.fillColor = 'blue';
							circles.push(circle);
						}

						else if ( (j < (right - idk)) && (j > (right - idk - 200)) ){
							var x = j;
							var y = i*15;

							var circle = new Path.Circle(new Point(x, y),radius);
							circle.strokeColor = 'blue';
							circle.fillColor = 'blue';
							circles.push(circle);
						}
					}

					// make center
					if(j > (right* 0.81)/2 && j < (right - (right* 0.81)/2) && i > 27){

						var x = j;
						var y = i*15;

						var circle = new Path.Circle(new Point(x, y),radius);
						circle.strokeColor = 'blue';
						circle.fillColor = 'blue';
						circles.push(circle);
					}

				}
			}

			view.onFrame = function(event) {
				for(var i = 0; i < circles.length; i++){

					var dx = (Math.random() * 2 - 1)*.5;
					var dy = (Math.random() * 2 - 1)*.5;

					var x = circles[i].position.x;
					var y = circles[i].position.y;

					if(check(x,y,idk,idk2,right)){
						circles[i].position.x += dx;
				    	circles[i].position.y += dy;
					}
				    else{
				    	circles[i].position.x -= dx;
				    	circles[i].position.y -= dy;
				    }

				}
			}

			paper.view.draw();
		}
