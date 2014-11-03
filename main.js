function move(element,container)
{
	var i=0;
	var from=parseInt(element[i].style.top.substring(-2));
	var to=parseInt(element[i].dataset.to);
	var len = element.length;
	element[i].style.display = 'block';

	function frame()
	{
		from+=100;

		if(from >= to-80)
		{
			element[i].style.top = element[i].dataset.to+'px';

			i++;

			if(i == len)
			{
				clearInterval(a);
				return;
			}
			from=parseInt(element[i].style.top.substring(-2));
			to = parseInt(element[i].dataset.to);
			element[i].style.display = 'block';
		}
		else
		{
			element[i].style.top = from+'px';
		}
	}

	var a = setInterval(frame,1000);
}

function mousePress(e)
{	
	if(this.tagName == 'IMG')
	{
		currentObj = this.parentNode;
	}
	else
		currentObj = this;

	tx = parseInt(currentObj.style.left.substring(-2));
	ty = parseInt(currentObj.style.top.substring(-2));

	fx = e.pageX;
	fy = e.pageY;

	document.getElementById('container').onmousemove = mouseMove;

}
function mouseUp()
{
	currentObj = null;	
}

function mouseMove(e)
{
	if(currentObj != null)
	{
		currentObj.style.left = e.pageX - fx +tx ;
		currentObj.style.top = e.pageY - fy + ty;
	}
}


function getImages()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText == '')
			{
				var container = document.getElementById("container");

				if(parseInt(container.dataset.height) - parseInt(container.dataset.row)*97 < 200 )
				{
					var height = parseInt(container.dataset.height) + 100;
					container.style.height = height + 'px';
					container.dataset.height = height;
					var elements = document.getElementsByClassName('item');
					var len = elements.length;

					for(i=0 ;i<len;i++)
					{
						elements[i].style.top = (parseInt(elements[i].style.top.substring(-2))+100) + 'px';
						elements[i].dataset.to = parseInt(elements[i].dataset.to) + 100;	
					}
				}
				return;
			}

			var obj = JSON.parse(xmlhttp.responseText);
			var container = document.getElementById("container");
			var list = [];
			var j = parseInt(container.dataset.col);
			var k = parseInt(container.dataset.row);
			document.getElementById('lastItem').value = obj[0];

			for( i in obj)
			{
				div = document.createElement('div');
				div.setAttribute('class','item');
				div.style.height = 70;
				div.style.width = 90;
				div.dataset.data = obj[i];
				div.onmousedown = mousePress;
				div.onmouseup = mouseUp;
				img = document.createElement('img');

				img.onmousedown = mousePress;
				img.onmouseup = mouseUp;
				div.appendChild(img);

				div.style.top = 0;
				div.style.display = 'none';

				if(j==0)
					div.style.left = j*92;
				else
				{
					if (screen.width - (j+1)*92 < 0)
					{
						j=0;
						k++;
						div.style.left = 0;	
					}
					else
						div.style.left = j*97;
				}
				div.dataset.col = j;
				div.dataset.row = k;
				div.dataset.to = parseInt(container.dataset.height)-72-k*77;

				img.setAttribute('src','http://static.chotot.com.vn/listing_thumbs'+obj[i]);

				container.appendChild(div);

				list.push(div);

				j++;
			}
			container.dataset.col = j;
			container.dataset.row = k;
			move(list,container);
		}
	}

	xmlhttp.open("GET","./ajax.php?last="+document.getElementById('lastItem').value,true);
	xmlhttp.send();
}

container = document.getElementById("container");

if(container.dataset.height == '0')
	container.dataset.height = container.clientHeight;
else
{
	var check = 0;
	var value = 0;

	if(parseInt(container.dataset.height) > parseInt(container.clientHeight))
	{
		container.style.height = container.dataset.height +'px';
	}

	if(parseInt(container.dataset.height) < parseInt(container.clientHeight))
	{
		check = -1;
		value = parseInt(container.clientHeight) - parseInt(container.dataset.height);
	}

	var elements = document.getElementsByClassName('item');
	var len = elements.length;
	for(i=0;i<len;i++)
	{
		if(check == -1)
			elements[i].style.top = (parseInt(elements[i].style.top.substring(-2)) + value) + 'px';

	}
}

var currentObj=null;

getImages();
var main = setInterval(getImages,15000);

function clickFunc()
{
	var time=0;
	if(document.getElementById("time").value.trim() != '')
	{
		time = parseInt(document.getElementById("time").value);
	}

	else
	{
		alert("Filling time");
		return;
	}

	if(!isNaN(time) && time > 5)
	{
		clearInterval(main);
		main = setInterval(getImages,time*1000);
		alert("Changed");	
	}
	else if(time < 5)
	{
		alert("Time should greater than 5 seconds");	
	}
	else
	{
		alert("Time is invalid");
	}
}
function shareFunc()
{
	var elements = document.getElementsByClassName('item')
	var rs = [];
	var len = elements.length;
	for(i=0 ;i<len;i++)
	{
		rs.push(elements[i].dataset);
	}
	rs.push({containerHeight:document.getElementById('container').dataset.height});
	rs.push({maxValue:document.getElementById('lastItem').value });
	str = JSON.stringify(rs);

	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function()
	{
		document.getElementById("link").innerHTML = 'Link: http://localhost/demo/share.php?token='+xmlhttp.responseText;
		document.getElementById("container").dataset.token = xmlhttp.responseText;
	}

	xmlhttp.open("GET","./ajax.php?data="+str,true);
	xmlhttp.send();
}