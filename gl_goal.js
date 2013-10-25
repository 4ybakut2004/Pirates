var script = document.createElement('script');
script.src = 'story.js';
document.head.appendChild(script);

script = document.createElement('script');
script.src = 'rule.js';
document.head.appendChild(script);
var gl;											//главная GL херня

var posx_g;										//x игрока  
var posy_g;										//y игрока
var posxy_m = new Array(); 									//x, y монстрика
var posx_b;										//x бонуса второго уровня
var posy_b;										//y бонуса второго уровня
var bal;										//количество собранных монеток!
var bom;										//количество собранных бомб на 2 уровне

var k = 74;										//количество буферов (по количеству кратинок)
var flag;										//флаг прыжка
var fl_p;										//флаг pause
var rab;										//номер исходной картинки
var y_m;										//положение по у монеток
var fl_gun;										//нажали f
var fg_lev;										//блок на левел
var distance;									//время старта второго уровня
var distance_new;								//время уже нахождения на уровне
var distance_max;								//максимально возможное время нахождение на уровне

var canvas;										//тут все ясно, хост
var currentlyPressedKeys = new Array();			//массив нажатых клавишь
						
var shaderProgram;								//главная шейдерная херня	
var resolutionLocation;							//это нам для шейдера, зачем только -___-				

var objVertexPositionBuffer = new Array();		//координатный буффер
var objVertexTextureCoordBuffer = new Array(); 	//текстурный буффер

var kol, kol_b, kol_br, kol_ya, kol_bub, kol_gun;	//пока костыли
var mas_mon = new Array();						//массив монеток
var mas_fon = new Array();						//массив фонов
var mas_fon_2 = new Array();					//массив фонов 2
var mas_fon_3 = new Array();					//массив фонов 3
var mas_br = new Array();						//массив бомбы
var mas_down = new Array();						//массив бревен
var mas_up = new Array();						//массив якорей
var texture = new Array();						//массив айдишников текстур
var mas_bub = new Array();						//массив бубликов
var mas_kuch_bub = new Array();                 //массив кучек бубликов
var mas_gun = new Array();						//массив стреляющих бомб

var s;											//скорость человечка
var s_m;										//скорость момнеток
var s_b;										//скорость бомб
var s_br;										//скорость бревен
var s_ya;										//скорость якорей
var s_bub;										//скорость бубликов

var mus = 0;									//флаг на проигрыш музыки
var fl_bl;										//для какого-то хитрого подсчета ага -____-	
var fl_over;								    //конец игры!	
var code;										//не перезаписыват!!

var fg_bub;										//флаг нанесенного урона	

var met;										//метры
var his;										//истории
var cl_st;										//закрыта ли история		

var mas_shu = new Array();						//координаты по у шупальцев
var s_x, s_y;									//координаты звезды
var fl_shit;									//защита от бомб
var go;											//пробег с аурой

var level;										//уровень игры
var level_1_vis;								//был ли открыть первый уровень
var level_2_vis;								//был ли открыть второй уровень
var level_3_vis;								//был ли открыть третий уровень

var slow = 0;                                   //замедлен ли игрок

var gun;										//окличество бомб
var dubl_krak;									//второй кракен

var mas_point = new Array(15, 40, 90, 180, 400); 

var arrXY = {									//массив для ослеживания границ преметов
35: [200, 100, 370, 50, 100, 160, 30], 36: [84, 200, 1, 50, 165, 50, 30], 
49: [98, 98, 15, 50, 85, 50, 30], 50: [157, 139, 325, 0, 200, 160, 30]
};									

var num_pr;										//номер открытого правила			
//---------------------------клавиши, мышки-----------------------------------------------
function handleKeyDown(event) 
{
	currentlyPressedKeys[event.keyCode] = true;
}
	 
function handleKeyUp(event) 
{
    currentlyPressedKeys[event.keyCode] = false;
	fl_gun = 0;
}

function move_obj_mas(num, sp, mas_m)
{
	for(var v = 0; v < num; v++) mas_m[v] -= sp;
}

function move_obj_struct(num, sp, mas_m)
{
	for(var v = 0; v < num; v++) mas_m[v][0] -= sp;
}
function handleKeys() 
{
	if (currentlyPressedKeys[80] && (flag||fg_lev)) 
	{
		Pause();
		currentlyPressedKeys[80] = false;
	}
	if(document.getElementById('over').style.display!='block'&&(flag||fg_lev)&&fl_p&&!cl_st)
	{
		if(!level) flag = 1; else flag = 0;
		if (currentlyPressedKeys[68]) 
		{
			posxy_m[0][0] -= 1;
			posxy_m[1][0] -= 1;
			switch(level)
			{
			case 0:
				move_obj_struct(11, s, mas_fon);
				move_obj_struct(kol, s_m, mas_mon);
				move_obj_mas(kol_br, s_br, mas_down);
				move_obj_struct(kol_ya, s_ya, mas_up);
				if(fl_shit) go += s;
				s_x--;
				move_obj_struct(kol_b, s_b, mas_br);
				break;
			case 1:	
				if(!slow)
				{
					move_obj_struct(11, s, mas_fon_2);
					move_obj_mas(kol_br, s_br, mas_down);
					move_obj_struct(kol_ya, s_ya, mas_up);
					posx_b -= 2;
					move_obj_struct(kol_b, s_b, mas_br);
				}
				break;
			case 2:
				move_obj_struct(11, s, mas_fon_2);
			}
			met += s;
			for(var f = 0; f<8; f++)
			{
				mas_shu[0][f] = Math.floor((Math.random()*10)-5) + posxy_m[0][1];
				mas_shu[1][f] = Math.floor((Math.random()*10)-5) + posxy_m[1][1];
			}
		}
		if (currentlyPressedKeys[87]) 
		{
			if(posy_g>0) posy_g -= 5;
		}
		if (currentlyPressedKeys[83]) 
		{
			if(posy_g<370) posy_g += 5;
		}
		
		if (currentlyPressedKeys[70]&&level==2) 
		{ 
		    if(!fl_gun) add_gun();
			fl_gun = 1;
		}
    }
    if (currentlyPressedKeys[68]&&!flag&&rab&&fg_lev) 
	{
		if(!level) flag = 1;  else flag = 0;
		//fg_lev = 0;
	}
	if(currentlyPressedKeys[13])
	{
		Close();
	}
}

//---------------------------инициализация всего-----------------------------------------
function init_GL()
{
	canvas=document.getElementById("canvas");
	gl=getWebGLContext(canvas);
	if(!gl)
	{
		alert('Ваши драйвера утстарели или ваше видео карта не подерживает WebGL!');
		return;
	}
	
	gl.enable ( gl.BLEND ) ;
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	//-------------------------пошли монетки инит-----------------------------------------
	y_m = Math.floor((Math.random()*400)+10);
	kol = Math.floor((Math.random()*10)+1);
	mas_mon[0] = [Math.floor((Math.random()*700)+500), 1];
	for(var i = 1; i < kol; i++) 
	{
		mas_mon[i] = [mas_mon[i-1][0] + 50, 1];
	}
	//-----------------------фоны инит----------------------------------------------------
	for(var i = 0; i < 11; i++) 
	{
		mas_fon[i] = [700*i, 0];
	}
	mas_fon[0][1] = 1;
	mas_fon[1][1] = 1;
	
	for(var i = 0; i < 11; i++) 
	{
		mas_fon_2[i] = [700*i, 0];
	}
	mas_fon_2[0][1] = 1;
	mas_fon_2[1][1] = 1;
	
	for(var i = 0; i < 11; i++) 
	{
		mas_fon_3[i] = [700*i, 0];
	}
	mas_fon_3[0][1] = 1;
	mas_fon_3[1][1] = 1;
	
	//----------------------бомбы инит----------------------------------------------------
	kol_b = Math.floor((Math.random()*10)+1);
	mas_br[0] = [Math.floor((Math.random()*700)+500), 1, Math.floor((Math.random()*400)+10)];
	for(var i = 1; i < kol_b; i++)
	{
		mas_br[i] = [mas_br[i-1][0] + Math.floor((Math.random()*200)+50), 1, Math.floor((Math.random()*400)+10)];
	}
	
	//---------------------щупальцы кальмарчика-------------------------------------------
	gt = new Array();
	gt1 = new Array();
	for(var f = 0; f<8; f++)
	{
		gt[f] = Math.floor((Math.random()*10)-5) + posxy_m[0][1];
		gt1[f] = Math.floor((Math.random()*10)-5) + posxy_m[1][1];
	}
	mas_shu[0] = gt;
	mas_shu[1] = gt1;
	//---------------------бревна инит----------------------------------------------------
	kol_br = Math.floor((Math.random()*2)+1);
	mas_down[0] = Math.floor((Math.random()*700)+700);
	for(var i = 1; i < kol_br; i++)
	{
		mas_down[i] = mas_down[i-1] + Math.floor((Math.random()*300)+100);
	}
	
	//---------------------якоря инит----------------------------------------------------
	kol_ya = Math.floor((Math.random()*2)+1);
	mas_up[0] = [Math.floor((Math.random()*700)+600), 0, 1];
	for(var i = 1; i < kol_ya; i++)
	{
		mas_up[i] = [mas_up[i-1][0] + Math.floor((Math.random()*300)+100), 0, 1];
	}
}

function init_level_2()
{
	kol_ya = Math.floor((Math.random()*2)+1);
	mas_up[0] = [Math.floor((Math.random()*700)+600), Math.floor((Math.random()*50)+70), 1];
	for(var i = 1; i < kol_ya; i++)
	{
		mas_up[i] = [mas_up[i-1][0] + Math.floor((Math.random()*300)+100), Math.floor((Math.random()*50)+70), -1];
	}
	
	kol_br = Math.floor((Math.random()*2)+1);
	mas_down[0] = Math.floor((Math.random()*700)+700);
	for(var i = 1; i < kol_br; i++)
	{
		mas_down[i] = mas_down[i-1] + Math.floor((Math.random()*300)+100);
	}
}
function initShader()
{
	vertexShader=createShaderFromScriptElement(gl,"2d-vertex-shader");
	fragmentShader=createShaderFromScriptElement(gl,"2d-fragment-shader");
	
	shaderProgram = gl.createProgram();
	
	gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
	
	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Can`t initialise shaders');
    }
	
	gl.useProgram(shaderProgram);
	
	shaderProgram.vertexPositionAttribute=gl.getAttribLocation(shaderProgram,"a_position");


	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	
	shaderProgram.textureCoordAttribute=gl.getAttribLocation(shaderProgram,"a_texCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	
	resolutionLocation=gl.getUniformLocation(shaderProgram,"u_resolution");
	gl.uniform2f(resolutionLocation,canvas.width,canvas.height);
	
}

function initBuff()
{
	for(var i=0; i<k; i++)
	{
		objVertexPositionBuffer[i] = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, objVertexPositionBuffer[i]);
	}
	var i = 0;
	objVertexTextureCoordBuffer[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, objVertexTextureCoordBuffer[i]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),gl.STATIC_DRAW);
}

function initTex(texture)
{
	gl.bindTexture(gl.TEXTURE_2D,texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

function createTex(image_name)
{
	var image = new Image();
	var texture = gl.createTexture();
	image.src = image_name;
	texture.image = image;
	image.onload = function()
	{
		initTex(texture);
	}
	return texture;
}
//---------------------------повторы--------------------------------------------------
function pov(px, py, w, h, nu)
{
	gl.bindTexture(gl.TEXTURE_2D, texture[nu]);
	gl.uniform1i(shaderProgram.samplerUniform, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, objVertexPositionBuffer[nu]);
					
	setRectangle(gl, px, py, w, h);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,2,gl.FLOAT,false,0,0);
					
	gl.bindBuffer(gl.ARRAY_BUFFER, objVertexTextureCoordBuffer[0]);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute,2,gl.FLOAT,false,0,0);
					
	gl.drawArrays(gl.TRIANGLES,0,6);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

function move_shup()
{
	if(slow) posxy_m[0][0] += 2;
	else
	{
		posxy_m[0][0] += 1;
		posxy_m[1][0] += 1;
	}
	if(posy_g<360) 
	{
		posy_g+=1; 
	}
	else
	{			
		if(posy_g<410) 
		{
			posy_g-=1;
		}
	}
	for(var f = 0; f<8; f++)
	{
		mas_shu[0][f] = posxy_m[0][1] + Math.floor((Math.random()*10)-5);
		mas_shu[1][f] = posxy_m[1][1] + Math.floor((Math.random()*10)-5);
	}
}
function show_fon(mas_2, con)
{
	var i = 0;
	if(mas_2[10][0] <= 0)
	{
		for(var j = 0; j < 11; j++) 
		{
			mas_2[j] = [700*j, 0];
		}
		mas_2[0][1] = 1;
		mas_2[1][1] = 1;
	}
	
	for(i=0; i<11; i++)
	{
		if(mas_2[i][1])
		{
			pov(mas_2[i][0], 0, 700, 465, con+i);
		}
		if(mas_2[i][0] < -700)
		{		
			mas_2[i][1] = 0;
			mas_2[(i + 2) % 11][1] = 1;
		}
	}
}

function show_boom()
{
	i = 24;
	if(mas_br[kol_b - 1][0] < -100)
	{
		if(!level)
		{
			var asd = 0;
			for(var q = 0; q<kol_b; q++)
			{
				asd++;
			}
			if(asd == kol_b) if(posxy_m[0][0]-10>=0) posxy_m[0][0] -= 6;
		}
		kol_b = Math.floor((Math.random()*10)+1);
		mas_br[0] = [Math.floor((Math.random()*700)+500), 1, Math.floor((Math.random()*400)+10)];
		for(var i = 1; i < kol_b; i++)
		{
			mas_br[i] = [mas_br[i-1][0] + Math.floor((Math.random()*200)+50), 1, Math.floor((Math.random()*400)+10)];
		}
	}
	
	if(!level)
	{	
		for(var q = 0; q<kol_b; q++)
		{
			if(mas_br[q][1])
			{
				if(posy_g>= mas_br[q][2]-80 && posy_g<= mas_br[q][2]+40 && posx_g<=mas_br[q][0] && posx_g>=-50+mas_br[q][0])
				{	
					if(!fl_shit)
					{
						mas_br[q][1] = 0;
						posxy_m[0][0] += 5; 													//если аура не поймана
					}
				}
				pov( mas_br[q][0], mas_br[q][2], 50, 50, i);
			}
		}
	}
	else
	{
		for(var q = 0; q<kol_b; q++)
		{
			if(mas_br[q][1])
			{
				if(posy_g>= mas_br[q][2]-80 && posy_g<= mas_br[q][2]+40 && posx_g<=mas_br[q][0] && posx_g>=-50+mas_br[q][0])
				{	
					mas_br[q][1] = 0;
					bom ++;
					document.getElementById("bal").innerHTML = bom;
				}
				pov( mas_br[q][0], mas_br[q][2], 50, 50, i);
			}
		}
	}
}

function show_monstr(i)
{
	var f = 0;
	for(var gk = i; gk < i + 9; gk++)
	{
		if(level<2||i<60&&dubl_krak)
		{			
			if(gk==26) pov(posxy_m[0][0], posxy_m[0][1], 200, 200, gk);
			else pov(posxy_m[0][0], mas_shu[0][f], 200, 200, gk);
		}
		else
		{
			if(gk==63) pov(posxy_m[1][0], posxy_m[1][1], 200, 200, gk);
			else pov(posxy_m[1][0], mas_shu[1][f], 200, 200, gk);
		}
		f++;
	}
}

function show_up(i, mas_pr)
{
	if(mas_pr[kol_ya - 1][0] < -100)
	{
		kol_ya = Math.floor((Math.random()*2)+1);
		if(i!=36) mas_pr[0] = [Math.floor((Math.random()*700)+700), Math.floor((Math.random()*50)+70), 1]; 
		else mas_pr[0] = [Math.floor((Math.random()*700)+700), 0, -1];
		for(var j = 1; j < kol_ya; j++)
		{
		
			if(i!=36) mas_pr[j] = [mas_pr[j-1][0] + Math.floor((Math.random()*300)+100), Math.floor((Math.random()*50)+70), -1];
			else mas_pr[j] = [mas_pr[j-1][0] + Math.floor((Math.random()*300)+100), 0, -1];
		}
	}
	for(var j = 0; j<kol_ya; j++)
	{
		if(posy_g + arrXY[i][3] >= mas_pr[j][1] && posy_g<= mas_pr[j][1] + arrXY[i][4] && posx_g + arrXY[i][5] >= mas_pr[j][0] && posx_g<=arrXY[i][6]+mas_pr[j][0])
		{	
			if(i>40)
			{
				slow = 5;
			}
			else 
			{
				fl_over = 1;
			}
		}
		if(!level) pov(mas_pr[j][0], arrXY[i][2], arrXY[i][0], arrXY[i][1], i);
		else pov(mas_pr[j][0], mas_pr[j][1], arrXY[i][0], arrXY[i][1], i);
	} 
}

function show_down(i, mas_d)
{
	if(mas_d[kol_br - 1] < -arrXY[i][0])
	{
		kol_br = Math.floor((Math.random()*2)+1);
		mas_d[0] = Math.floor((Math.random()*700)+700);
		for(var j = 1; j < kol_br; j++)
		{
			mas_d[i] = mas_d[i-1] + Math.floor((Math.random()*300)+100);
		}
	}
	for(var j = 0; j<kol_br; j++)
	{
		if(posy_g + arrXY[i][3] >= arrXY[i][2] && posy_g <= arrXY[i][2] + arrXY[i][4] && posx_g <= mas_d[j] + arrXY[i][5] && posx_g + arrXY[i][6] >= mas_d[j])
		{	
			fl_over = 1;
		}
		pov(mas_d[j], arrXY[i][2], arrXY[i][0], arrXY[i][1], i);
	}
}

function skull(i)
{
	if(!level)
	{
		if(pos==0 && bal==mas_point[pos]*kon/100)
		{ 
			kl++; 
			kon += 20;
		}
		else if(bal-mas_point[pos-1]==(mas_point[pos]-mas_point[pos-1])*kon/100){ kl++; kon += 20;}
		for(var l = 0; l < kl; l++)
		{
			pov(580 - 50*l, 5, 50, 50, i);
		}
	}
	else
	{
		if(fg_lev)
		{
			kl = 5 - ((distance_new.valueOf() - distance.valueOf()) / distance_max)*5.0;
			s_bub = 5 - kl + 4;
			for(var l = 0; l < kl; l++)
			{
				pov(580 - 50*l, 5, 50, 50, i);
			}
		}
	}
}

function show_bub()
{
	if(mas_bub[0][0] < -100)
	{	
		mas_bub[0] = [posxy_m[1][0] + 30, 1, Math.floor((Math.random()*50)+10) + posxy_m[1][1]];
	}
	
	var kuch_len;
	if(mas_kuch_bub.length != 0)
	{
		if(mas_kuch_bub[6][0] < -100)
		{	
			mas_kuch_bub.splice(0, 7);
		}
	}
	
	if(fg_bub)
	{
		kuch_len = mas_kuch_bub.length;
		for(var i = kuch_len; i < kuch_len + 7; i++)
		{
		    mas_kuch_bub.push([posxy_m[1][0] + 30 + Math.floor((Math.random()*130)+20), 1, Math.floor((Math.random()*130)+20) + posxy_m[1][1]]);
		}
		fg_bub = 0;
	}
	if(mas_bub[0][1])
	{
		if(posy_g>= mas_bub[0][2]-80 && posy_g<= mas_bub[0][2]+40 && posx_g<=mas_bub[0][0] && posx_g>=-50+mas_bub[0][0])
		{	
			mas_bub[0][1] = 0; 
			posx_g += 10;
		}
		pov( mas_bub[0][0], mas_bub[0][2], 50, 50, 73);
	}
	
	kuch_len = mas_kuch_bub.length;
	for(var q = 0; q<kuch_len; q++)
	{
		if(mas_kuch_bub[q][1])
		{
			if(posy_g>= mas_kuch_bub[q][2]-80 && posy_g<= mas_kuch_bub[q][2]+40 && posx_g<=mas_kuch_bub[q][0] && posx_g>=-50+mas_kuch_bub[q][0])
			{	
				mas_kuch_bub[q][1] = 0; 
				posx_g += 10;
			}
			pov( mas_kuch_bub[q][0], mas_kuch_bub[q][2], 50, 50, 73);
		}
	}
}


function show_bub_dubl()
{
	if(mas_bub[1][0] > 600)
	{	
		mas_bub[1] = [posxy_m[0][0] + 30, 1, Math.floor((Math.random()*50)+10) + posxy_m[0][1]];
	}
	
	if(mas_bub[1][1])
	{
		if(posy_g>= mas_bub[1][2]-80 && posy_g<= mas_bub[1][2]+40 && posx_g<=mas_bub[1][0] && posx_g>=-50+mas_bub[1][0])
		{	
			mas_bub[1][1] = 0; 
			posx_g += 10;
		}
		pov( mas_bub[1][0], mas_bub[1][2], 50, 50, 73);
	}
}
function add_gun()
{
	gun --;
	document.getElementById("bal").innerHTML = gun;
	mas_gun[kol_gun] = [posx_g + 20, 1, posy_g];
	kol_gun ++;
}

function show_gun()
{
	// кидаться бомбами в осминожку по F
	if(kol_gun>0)
	{
		if(mas_gun[0][0] > 600)
		{	
			// удаляем первую выпущенную бомбу
			mas_gun.splice(0, 1);
			kol_gun --;
		}
	}
	
	for(var q = 0; q<kol_gun; q++)
	{
		if(mas_gun[q][1])
		{
			if(posxy_m[1][1]>= mas_gun[q][2]-160 && posxy_m[1][1]<= mas_gun[q][2]+40 && posxy_m[1][0]<=mas_gun[q][0] && posxy_m[1][0]>=-50+mas_gun[q][0])
			{	
				mas_gun[q][1] = 0; 
				distance_new += 1;
				if((distance_new - 100) % 7 == 0) fg_bub = 1;
			}
			pov( mas_gun[q][0], mas_gun[q][2], 50, 50, 24);
		}
	}
}
//---------------------------отрисовка------------------------------------------------
var pos = 0;
var kon = 20;
var kl = 0;
function level_1()
{
	level_1_inf();
	if(!code)
	{
		//халява кончилась
		if(go>1200)
		{ 
			fl_shit = 0; 
			go = 0; 
		}					
		for(var j = 0; j<5; j++)
		{
			if(bal==mas_point[j]&&!fl_bl)
			{
				s_m ++;
				s ++;
				s_b ++;
				s_br ++;
				s_ya ++;
				fl_bl = 1;
				story();
				fl_p = 0;
				pos = j + 1;
			}
			if(bal==mas_point[j]+1) fl_bl = 0;
		}
		if(rab != 0)													//выбран ли герой!
		{
			if(posx_g-80<=posxy_m[0][0]&&posx_g>=posxy_m[0][0]||fl_over) gameOver();	//не пора ли заканчивать?)
			else
			{
				
				if(flag&&fl_p&&!cl_st)									//можно ли нам двигать?)
				{	
					move_obj_struct(kol, s_m, mas_mon);
					move_obj_struct(11, s, mas_fon);
					move_obj_struct(kol_b, s_b, mas_br);
					move_obj_mas(kol_br, s_br, mas_down);
					move_obj_struct(kol_ya, s_ya, mas_up);
					if(fl_shit) go += s;
					s_y++;
					met += s;
					move_shup();
				}
				var i;
				
				//---------------------фон----------------------------------------------------------
				show_fon(mas_fon, 0);
				//---------------------монетки------------------------------------------------------
				i = 25;
				if(mas_mon[kol - 1][0] < -100)
				{
					y_m = Math.floor((Math.random()*400)+10);
					kol = Math.floor((Math.random()*10)+2);
					mas_mon[0] = [Math.floor(700 + Math.random()*1000), 1];
					for(var v = 1; v < kol; v++)
					{
						mas_mon[v] = [mas_mon[v-1][0] + 50, 1];
					}
				}
					
				for(var q = 0; q<kol; q++)
				{
					if(mas_mon[q][1])
					{
						if(posy_g>=y_m-100 && posy_g<=y_m+50 && posx_g<=mas_mon[q][0] && posx_g>=-50+mas_mon[q][0])
						{
							bal ++;
							document.getElementById("bal").innerHTML = bal;
							mas_mon[q][1] = 0;	
							level_2_vis = 1;
							level = 1;
						}
						pov(mas_mon[q][0], y_m, 50, 50, i);
					}
				}
				//---------------------монстр----------------------------------------------------------
				show_monstr(26);
				//---------------------бомбы---------------------------------------------------------
				show_boom();
				//---------------------герой---------------------------------------------------------
				pov(posx_g,posy_g, 100, 100, rab);
				//---------------------бревна--------------------------------------------------------
				show_down(35, mas_down);
				//---------------------якорь---------------------------------------------------------
				show_up(36, mas_up);
				//---------------------бонус!!!------------------------------------------------------		
				i = 37;
				var ah = Math.floor((Math.random()*100) + 1);
				if(s_y>400&&ah==2&&!fl_shit) 
				{
					s_x = Math.floor((Math.random()*700) + 300);
					s_y = -70;
				}
				if(posx_g + 50 >= s_x && posx_g <= s_x && posy_g + 50 >= s_y &&posy_g <= s_y) 
				{
					s_y = 500;
					fl_shit = 1;
				}
				pov(s_x, s_y, 50, 50, i);
				if(fl_shit)
				{
					pov(600, 60, 25, 25, i);
				}
				//------------------------------черепушечки----------------------------------------------------
				skull(23);
			}
		}
	}
}

var fk = -2;
function level_2()
{
	level_2_inf(); 
	if((distance_new.valueOf() - distance.valueOf()) > distance_max)
	{	
		level = 2;
		level_3_vis = 1;
		fg_lev = 0;
	}
	if(!code)
	{
		if(posx_g-80<=posxy_m[0][0]&&posx_g>=posxy_m[0][0]||fl_over) gameOver();	
		//не пора ли заканчивать?)
		else
		{
			//можно ли нам двигать?)
			if(fl_p&&!cl_st)												
			{
				if(fg_lev)
				{
					distance_new = new Date();
					move_obj_struct(11, s, mas_fon_2);
					move_obj_struct(kol_b, s_b, mas_br);
					move_obj_mas(kol_br, s_br, mas_down);
					move_obj_struct(kol_ya, s_ya, mas_up);
					for(var q = 0; q < kol_ya; q++)
					{
						if(mas_up[q][1]<15) mas_up[q][2] = - mas_up[q][2];
						if(mas_up[q][1]>120) mas_up[q][2] = - mas_up[q][2];
						mas_up[q][1] += 2*mas_up[q][2];	
					}
					if(posy_b<200) fk = -fk; 
					posy_b += fk;
					if(slow>0) slow--;
					move_shup();
				}
				// --------------------задается фон--------------------------------------------------
				show_fon(mas_fon_2, 38);
				//---------------------бомбы---------------------------------------------------------
				show_boom();
				//---------------------герой---------------------------------------------------------
				pov(posx_g, posy_g, 100, 100, rab);
				//---------------------монстр--------------------------------------------------------
				show_monstr(26);
				//---------------------птицы---------------------------------------------------------
				show_up(49, mas_up);
				//---------------------рифы----------------------------------------------------------
				show_down(50, mas_down);
				//---------------------черепушечки---------------------------------------------------
				skull(23);
				//---------------------рыбанька------------------------------------------------------
				var i = 51;
				var ah = Math.floor((Math.random()*100) + 1);
				if(posy_b>=500&&ah==2) 
				{
					posx_b = Math.floor((Math.random()*700) + 300);
					posy_b = 450;
					fk = -2;
				}
				if(posx_g + 50 >= posx_b && posx_g <= posx_b && posy_g + 50 >= posy_b &&posy_g <= posy_b) 
				{
					posy_b = 500;
					bom += 5;
					document.getElementById("bal").innerHTML = bom;
				}
				pov(posx_b, posy_b, 62, 62, i);
			}
		}
	}
}

function level_3()
{
	level_3_inf();
	if(!code)
	{
		if(posxy_m[1][0] > 600||fl_over||gun<0||posx_g-80<=posxy_m[0][0]&&posx_g>=posxy_m[0][0]||posx_g-80<=posxy_m[1][0]&&posx_g>=posxy_m[1][0]||distance_new==200)
        {
		    gameOver();
        }			
		//не пора ли заканчивать?)
		else
		{
			//можно ли нам двигать?)
			if(fl_p&&!cl_st)												
			{	
				if(fg_lev)
				{
					move_obj_struct(11, s, mas_fon_3);
					
					move_obj_struct(mas_kuch_bub.length, s_bub, mas_kuch_bub);
					move_obj_struct(kol_gun, -4, mas_gun);
					move_shup();
					posxy_m[1][1] += Math.floor((Math.random()*21) - 10);
					if(posxy_m[1][1]<10) posxy_m[1][1] += 10;
					if(posxy_m[1][1]>330) posxy_m[1][1] -= 10;
					posxy_m[0][1] += Math.floor((Math.random()*21) - 10);
					if(posxy_m[0][1]<10) posxy_m[0][1] += 10;
					if(posxy_m[0][1]>330) posxy_m[0][1] -= 10;
					
					if(distance_new>distance_max + 50) 
					{
						dubl_krak = 1;
						mas_bub[0][0] -= s_bub;
						mas_bub[1][0] += s_bub;
					}
					else mas_bub[0][0] -= s_bub;
				}
				// --------------------задается фон--------------------------------------------------
				show_fon(mas_fon_3, 52);
				//---------------------герой---------------------------------------------------------
				pov(posx_g, posy_g, 100, 100, rab);
				//---------------------монстр--------------------------------------------------------
				show_monstr(63);
				//---------------------сердца--------------------------------------------------------
				skull(72);
				//---------------------бублики-------------------------------------------------------
				show_bub();
				//---------------------бомбочки-оружие-----------------------------------------------
				show_gun();
				//----------------
				if(distance_new>distance_max + 50)
				{
					show_monstr(26);
					show_bub_dubl();
				}
			}
		}
	}	
}

function drawScene()
{	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	switch(level)
	{
		case 0: level_1(); break;
		case 1: level_2(); break;
		case 2: level_3(); break;
	}
}


function main()
{
	Start();
	
	document.getElementById("p2").innerHTML = mas_pr[num_pr];	
	document.getElementById("p5").innerHTML = "Игра разработана командой <a href=\"http://fk-2o13.diary.ru/?tag=4902746\">fandom Pirates of the Caribbean 2013</a> для Фандомной битвы - 2013 на <a href=\"http://www.diary.ru/\">diary.ru</a> <br/>";
	//-----------------чтоб этот js!! с циклом не срабатывает, собака -___---------------
	
	var texturesPaths = 
	[
	// Фон
	"back_01.jpg", "back_02.jpg", "back_03.jpg", "back_04.jpg", "back_05.jpg",
	"back_06.jpg", "back_07.jpg", "back_08.jpg", "back_09.jpg", "back_10.jpg",
	"back_01.jpg",
	// Игроки
	"1.png", "2.png", "3.png", "4.png",  "5.png",  "6.png", 
	"7.png", "8.png", "9.png", "10.png", "11.png", "12.png",
	// Атрибутика
	"pol.png", "br.png", "den.png", 
	"kraken0.png", "kraken1.png", "kraken2.png", "kraken3.png",
	"kraken4.png", "kraken5.png", "kraken6.png", "kraken7.png", "kraken8.png",
	"brev.png", "yac.png", "sv.png",
	// Второй уровень
	// Фон
	"back_01.jpg", "back_02.jpg", "back_03.jpg", "back_04.jpg", "back_05.jpg",
	"back_06.jpg", "back_07.jpg", "back_08.jpg", "back_09.jpg", "back_10.jpg",
	"back_01.jpg",
	// птички
	"bird.png",
	// рифы
	"reef.png",
	// рыбка
	"fish.png",
	// больше фона!
	"back_01.jpg", "back_02.jpg", "back_03.jpg", "back_04.jpg", "back_05.jpg",
	"back_06.jpg", "back_07.jpg", "back_08.jpg", "back_09.jpg", "back_10.jpg",
	"back_01.jpg",
	// новый кракен!
	"kraken0_back.png", "kraken1_back.png", "kraken2_back.png", "kraken3_back.png",
	"kraken4_back.png", "kraken5_back.png", "kraken6_back.png", "kraken7_back.png", "kraken8_back.png",
	// сердце
	"heart.png",
	// бублик
	"bub.png"
	];
	
	for(var i = 0; i < k; i++)
	{
		texture[i] = createTex(texturesPaths[i]);
	}
	
	document.getElementById('player').play();
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
   
	drawFrame(); 
}

function setRectangle(gl,x,y,width,height)
{
	var x1=x;
	var x2=x+width;
	var y1=y;
	var y2=y+height;
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([x1,y1,x2,y1,x1,y2,x1,y2,x2,y1,x2,y2]),gl.STATIC_DRAW);
}

function drawFrame() 
{
	requestAnimFrame(drawFrame);
	handleKeys();
	drawScene();
}

//----------------------------------------всякие доп. окна------------------------------
function ChangeImage(num, kul)
{
	var g = "";
	
	switch(kul)
	{
		case 1: g = "im1"; pic = "1.png"; break;
		case 2: g = "im2"; pic = "2.png"; break;
		case 3: g = "im3"; pic = "3.png"; break;
		case 4: g = "im4"; pic = "4.png"; break;
		case 5: g = "im5"; pic = "5.png"; break;
		case 6: g = "im6"; pic = "6.png"; break;
		case 7: g = "im7"; pic = "7.png"; break;
		case 8: g = "im8"; pic = "8.png"; break;
		case 9: g = "im9"; pic = "9.png"; break;
		case 10: g = "im10"; pic = "10.png"; break;
		case 11: g = "im11"; pic = "11.png"; break; 
		case 12: g = "im12"; pic = "12.png"; break;
	}
	if(num==2)
	{
		rab = 10 + kul;
		document.getElementById("wind").style.display = "none";
		document.getElementById("wind_bal").style.display = "block";
		level_1_vis = 1;
	}
	else
	{
		if(num) document.getElementById(g).width="110";
		else document.getElementById(g).width="100";
	}
}

function close_rule()
{
	if(document.getElementById('level_2').style.display=='block'&&document.getElementById('wind_story').style.display=='none')
	{
		kl = 5;
		distance = new Date();
		distance_new = distance;
		fg_lev = 1;
		document.getElementById('level_2').style.display='none';
	}
	
	if(document.getElementById('level_3').style.display=='block')
	{
		document.getElementById('level_3').style.display='none';
		fg_lev = 1;
	}
	
	if(document.getElementById('level_1').style.display=='block')
	{
		document.getElementById('level_1').style.display='none';
		fg_lev = 1;
	}
}
function Close()
{
	if(document.getElementById('wind_story').style.display=='block')
	{
		document.getElementById('wind_story').style.display='none';
		fl_p = 1;
		kon = 20;
		kl = 0;
		cl_st = 0;
		if(his == 5)
		{
			// новый левел!
			level = 1;
			level_2_vis = 1;
		}
	}
}
function Close_about()
{
	document.getElementById('wind_about').style.display='none';
	return false;
}

function Close_over()
{
	document.getElementById('over_over').style.display='none';
	document.getElementById('over').style.display='block'; 
		
	document.getElementById('code_vs').style.display='block'; 
	
	met = (met - met%100)/100;
	document.getElementById('p3').innerHTML = "Ваш результат!<br/><br/>Количество монет......" + bal + "<br/>Пройдено метров......." + met + "<br/>Открыто историй......." + his + "</br>";
	
	if(level==1) document.getElementById('p3').innerHTML += "Собрано бомб..........." + bom + "</br>";
	if(level==2) document.getElementById('p3').innerHTML += "Кусок от босса......." + (((distance_new.valueOf() - distance.valueOf()) / distance_max)*100).toFixed(1) + "%";
	
	var s = "<textarea autofocus=\"autofocus\" id=\"inptext\" style=\"width:100%; height:100px; \" ><div style = \"width: 200px; height: 195px; color: #000; front-size: 10px; border-radius: 4px; background-color:#716a21; box-shadow: 2px 2px 6px #333, inset 0px 0px 10px #a89130; border: 1px solid #a18f52; filter: alpha(opacity=98); -moz-opacity: 0.98; -khtml-opacity: 0.98; opacity: 0.98;\" align=\"center\" ><img src=\"http://i.pixs.ru/storage/5/6/9/boardpng_6311240_8715569.png\" style = \"margin-top: 5px; \"><p style = \"margin-top: -23px; font-size:16px;\">Ваш результат!</p><p>";
	s += "<table cellpadding = 2> <tr><td>Количество монет</td><td width='20px' align=\"right\">" + bal + "</td></tr><tr>";
	s += "<td>Пройдено метров</td><td width='20px' align=\"right\"> " + met + "</td></tr><tr>";
	s += "<td>Открыто историй</td><td width='20px' align=\"right\">" + his + "</td></tr><tr>";
	s += "<td>Собрано бомб</td><td width='20px' align=\"right\">" + bom + "</td></tr><tr>";
	if(level==2) s += "<td>Кусок от босса</td><td width='20px' align=\"right\">" + (((distance_new.valueOf() - distance.valueOf()) / distance_max)*100).toFixed(1) + "%</td></tr>";
	else s += "<td>Кусок от босса</td><td width='20px' align=\"right\">" + 0 + "%</td></tr>";
	s += "</table><p><p><p><a href=\"http://potc-game.herokuapp.com/\">Играть снова?</a>";
	s += "</div></textarea>";
	document.getElementById("p6").innerHTML=s;
	return false;
}

function over()
{
	if(distance_new==200) document.getElementById("p10").innerHTML = "Ура! Победа!";
	else document.getElementById("p10").innerHTML = "Вы проиграли!";
	
	document.getElementById('over_over').style.display='block'; 
	return false;
}

function card()
{
	document.getElementById('wind').style.display='block'; 
	return false;
}

function story()
{
	var sr = "<b>Bоодушевляющая история!</b><br/>";
	if(his<5)
	{
		sr += mas_str[(rab-11)*5+his];
		document.getElementById("p4").innerHTML = sr;
		document.getElementById('wind_story').style.display='block';
		cl_st = 1;
		his++;
	}
	return false;
}
//----------------------обнуление все, начинаем все заново!-----------------------------
function Start()
{
	posx_g = 200;  	posy_g = 350;
	posxy_m[0] = [0, 260];
	posxy_m[1] = [400, 260];
	posx_b = 500; 	posy_b = 500;
	bal = 0;
	slow = 0;
	rab = 0;
	flag = 0;
	fl_p = 1;
	s = 1;										
	s_m = 2;									
	s_b = 3;
	s_br = 2;
	s_ya = 2;
	s_bub = 4;
	fg_bub = 0;
	fl_bl = 0;
	kon = 20;
	pos = 0;
	kl = 0;
	code = 0;
	fl_over = 0;
	met = 0;
	his = 0;
	num_pr = 0;
	cl_st = 0;
	level = 0;
	level_1_vis = 0;
	level_2_vis = 0;
	level_3_vis = 0;
	bom = 0;
	fg_lev = 0;
	distance = 0;
	distance_new = 0;
	fk = -2;
	kol_gun = 0;
	fl_gun = 0;
	gun = 0;
	dubl_krak = 0;
	// пока отведем минуту
	distance_max = 60000.0;

	fl_shit = 0;
	go = 0;
	
	s_x = Math.floor((Math.random()*700) + 200);
	s_y = -70;
	
	init_GL();
	initShader();	
	initBuff();
	
	card();
	
	document.getElementById("p2").innerHTML = mas_pr[num_pr];
	
	document.getElementById("wind_bal").style.display = "none";
	document.getElementById("bal").innerHTML = "0";
	
	document.getElementById('over').style.display='none';
	document.getElementById('code_vs').style.display='none';

	document.getElementById('wind_story').style.display='none';
	document.getElementById('wind_about').style.display='none';
	document.getElementById('over_over').style.display='none';
	document.getElementById('level_2').style.display='none';
	document.getElementById('level_1').style.display='none';
	document.getElementById('level_3').style.display='none';
}

//------------------------------------перервыв на твикс---------------------------------
function Pause()
{
	if(flag) if(fl_p) fl_p = 0; else fl_p = 1;
}
//-------------------------------------конец игры---------------------------------------
function gameOver()
{
	if(!code)
	{
		document.getElementById("wind_bal").style.display = "none";
		code = 1;
		over();
	}
	return false;
}

//------------------------------------об игре и создателях------------------------------
function About()
{
	document.getElementById('wind_about').style.display='block';
	return false;
}

//-------------------------------------промотка правил----------------------------------
function List()
{
	if(num_pr == mas_pr.length - 1)  num_pr = 0;
	else num_pr++; 
	document.getElementById("p2").innerHTML = mas_pr[num_pr];
	return false;
}

//-------------------------------------левел первый-------------------------------------
function level_1_inf()
{
	if(level_1_vis)
	{
		level_1_vis = 0;
		document.getElementById("bal").innerHTML = "0";
		document.getElementById("p11").innerHTML = "Собирай монетки и уворачивайся от бомб, а так же якорей и бревен! Лови голубую капельку, она подарит тебе защитную ауру от бомб на некоторое время!. Следи за черепками в углу, как только их станет 5, так новый открывок истории про твоего героя откроется! Собери все иcтории своего персонажа и переходи на следующий уровень!";

		document.getElementById('level_1').style.display='block';
	}
}

//-------------------------------------левел второй-------------------------------------
function level_2_inf()
{
	if(level_2_vis)
	{
		fg_lev = 0;
		init_level_2();
		bom = 0;
		level_2_vis = 0;
		s = 5; 									
		s_m = 6;							
		s_b = 7;	
		s_br = 6;	
		s_ya = 6;
		distance = new Date();
		distance_new = distance;
		document.getElementById("bal").innerHTML = "0";
		document.getElementById("p8").innerHTML = "<br/>Берегись! этот уровень коварен и опасен. У тебя будет не так много времени, чтобы собрать нужное количество бомб, которые пригодятся тебе на третьем уровне! Остерегайся рифов и птиц! И собирай как можно больше рыбок, они увеличат количество твоих бобм!";
		document.getElementById('level_2').style.display='block';
	}
}

//-------------------------------------левел третий-------------------------------------
function level_3_inf()
{
	if(level_3_vis)
	{
		gun = bom;
		//----------------------------инит бубликов-------------------------------------
		kol_bub = 1;
		mas_bub[0] = [430, 1, Math.floor((Math.random()*70)+20) + 260];
		mas_bub[1] = [430, 1, Math.floor((Math.random()*70)+20) + 260];
		
		//------------------------------------------------------------------------------
		posxy_m[1] = [400, 260];
		posxy_m[0] = [0, 260];
		level_3_vis = 0;
		distance = 100;
		distance_max = 60000.0;
		distance_new = distance;
		document.getElementById("p9").innerHTML = "И вот пришел час расплаты за все невзгоды! На этом уровне тебе необходимо уворачиваться от бубликов, которыми разбасывает Кракен и закидывать его в отместку, собранными бомбами на втором уровне, для этого необходимо жать на клавишу 'f'. Но будь внимателен, бомб у тебя не так много, а сердца в правом углу показывают на немалую жизнь Кракена. Удачи!";
		document.getElementById('level_3').style.display='block';
	}
}