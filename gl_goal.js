var gl;											//������� GL �����

var posx_g;										//x ������  
var posy_g;										//y ������
var posx_m; 									//x ���������
var posy_m;										//y ���������
var bal;										//����������, ��������� �������!

var k = 38;										//���������� ������� (�� ���������� ��������)
var flag;										//���� ������
var fl_p;										//���� pause
var rab;										//����� �������� ��������
var y_m;										//��������� �� � �������

var canvas;										//��� ��� ����, ����
var currentlyPressedKeys = new Array();			//������ ������� �������
						
var shaderProgram;								//������� ��������� �����	
var resolutionLocation;							//��� ��� ��� �������, ����� ������ -___-				

var objVertexPositionBuffer = new Array();		//������������ ������
var objVertexTextureCoordBuffer = new Array(); 	//���������� ������

var kol, kol_b, kol_br, kol_ya;					//���� �������
var mouseDown = false;							//������������ �����
var mas_mon = new Array();						//������ �������
var mas_fl = new Array();						//������ ������
var mas_fon = new Array();						//������ �����
var mas_fon_fl = new Array();					//������ ����� ������
var mas_br = new Array();						//������ �����
var mas_br_fl = new Array();					//������ ����� ������
var mas_br_y = new Array();						//������ � ����
var mas_brev = new Array();						//������ ������
var mas_yac = new Array();						//������ ������
var texture = new Array();						//������ ���������� �������

var s;											//�������� ���������
var s_m;										//�������� ��������
var s_b;										//�������� ����
var s_br;										//�������� ������
var s_ya;										//�������� ������

var mus = 0;									//���� �� �������� ������
var fl_bl;										//��� ������-�� ������� �������� ��� -____-	
var fl_over;								    //����� ����!	
var code;										//�� �������������!!	

var met;										//�����
var his;										//�������
var cl_st;										//������� �� �������		

var mas_shu = new Array();						//���������� �� � ���������
var s_x, s_y;									//���������� ������
var fl_shit;									//������ �� ����
var go;											//������ � �����

//var mas_point = new Array(1, 2, 3, 4, 5, 6, 7); 
var mas_point = new Array(20, 50, 100, 300, 700, 1000, 1200); 
var mas_pr = new Array(							//������ ������
"������ �������� ���������, �� �������� ������ ������. ��� ������ ������ �������� ����������� ������� ������� d. ������ �� ����� ���� ������� �� �� ����� �������. � ������� w � s ������� ���� ������������� �� ���� � ������ �������, ����� ������ � ����� ����.",
"�� ���� ���� ���� ��������� ����� � ������, �������� �� ���, ����� �������� ������ ������! ����� �� ���������, ��� ���������� � ������ ���� ������, ��� ������ ��, ��� ����� �� � �������� ����� ����� �������. ��� ������� ����� ���� �������! ������ ���!<br/>  �������� ������� ��������� �� Enter!",
"�� ��� ������ ������ ���������� �������� ��������, �� ������� �� ������, ��� ������� ���� �������������� ���������� ���� �����, ����� �� �������� �����!",
"���� �� �������� ���������, �� ��� p ��� ������������ ������� ����� �� ������.",
"������� ������? ������������ ���������� ��������. ��� �� ������� � ���������� ���������. �� �������!",
"������ ������ � ���? ��� ������ � �������, ��� �� ������� �� ������ � ����� �������, �� � �� ����������� ����!",
"���� �������� ����� ����? �� ����, ��� ������ �� ������ � ������������ �������� � ��������� ���� ������� �����������!",
"�� � ����������! ���� � ���� �������� ��� �� ����������� ����, ������ ���� ����:<br/>1. ��������� ���;<br/>2. ������������� �������;<br/>3. ������������ ��� ��;<br/>4. �� � �� ����� �������� ������, �������� �������.<br/>5. �� ��������� � ������������ ����� ����������! <br/> <p align=\"center\">�����!</p>"
);

var mas_str = new Array(
// �����
"- �����-������ � ����� ��� �����. � ������ ��� ������� �� ���� ����, �������� �������� ������ � ���������.<br/>" +
"- �������? � ����� ������� ��������������, � � ���� ����������� ������ � ������������, ������������.",

"� ��� ����? � ������� �����, ���� ���, ��� ���� ��� ������� ��� ���, ��� ����� ������ ������� �� ����� ��� ��������," +
" ����������� �� ������. ��� ����� ��� �� ��, ��� ������. �� ������� ����� ����, � �� ������ ������ � �������� ������.<br>" +
"� ��� �������� ���. � �������� ����������, ���������, �, �������, ������ ������� ��� ����. ",


"� ���� ���. � �������� �� � ������������ ��������. �������� ���� �������������, ��� ��� ������� ����� �������� �� �������," +
" �� ������ �������� �� ��������, ��� ������ �������� ������� ���� �����.",

"� ����� � ��� �� ���� ���������� �����?<br/>" +
"� ����.<br/>" +
"� ���, ��� �� ���?<br/>" +
"� �����<br/>" +
"� ��� � ��� �� ���?",

"� �� �� �������� ��� � �����, �������! �� ����� ����� � ��������� � �����.<br/>" +
"� �����-������ � ������� ��� �����, ��? � ���� ������ ���� ��� ��� �������� � ����������." +
" � �� ��� �� �����, �, ���� ������, ������ ����� ��� ���?!",

// ���
"�����-�� ����� ���� ����������� ���, ��� ��� ������ ���� � ������� ������������, ���������, ������� ������ ����� ������ ���� � �����" +
" ������ ������, ����, ��� ����� �����. �������, ��� �� ���, ��� � ����������� ��� � �� �������. ��������� ����� � ������ ������.",

"� � ���� ��������� ������� �� ������ ��������, �����. ������� ����� ����� ������������, �������� ����� ��������, � �������� ���������." +
" � ����� ���� ������� �������, �� �� ��������� ���� �������.",

"� ���� ���� � ������ �� �����, �� �������� � ��� ��������, ���� ��� ����������, ��� ��� ���� ���� ������ ���. �� ����, �����, ��������," +
" ��� ������ � �������� �������. � ���� ��� ���� �����, ������, � ������ �����, ��� �� ���. � ��� � ����� ���� ����� ����� � �����, ���� ����� ����� � ������! ",

"� ���� ��������, ������ ������ ���� �� �������. ��� ������� �������� ���, �� ����� ���-���� ������� ������� ����� �� ������� ���������.",

"� �������! �� �������� ��������! � ������� ������������ ���� ����, � ������ ������ ��������, ��� ��� ����� ���� ���, � �� ����� �� ��� ���������, � ����.  � ��� �� ������ �����.",

// ������
"������ ������ ������ ����� �������. ��������� �������. � ��� ������ ���� ���� � ����������, ���� ����," +
" ������ � �� ������� ����� �����-�� ��������. �������� ������ �����, �������� ����, ������� �� �����," +
" ������������  ����� �������� � ���� ������� � �� ����.",

"������ ������� ������ ����� ���� ��� ����� � ������ �������� ��������� ����� ������.��� ������� ��������, ������ � ������ �������������� ��� ����.",

"����� ��� �� ������ ������, �� ��� ��� ��������� ��������� ������ � ��� ���� ������ ����� �������. �� ������� ����� ������," +
" �������������� � ������� �����, ���� ��� �� ����������� �� ������.",

"��� �� ������������ � ��������. �� ������ ���, � ��� ����, ����� �� ��� ����, ������� ��� ��� ���, ����� ������ ����� ������." +
"  � ����� ����� ���������. ��� �� �������� � ���, ���������� ��������.",

"�������, ��� ����� �������� ��������� � ���, ��� �� �������.  ��� ������ �������� ���� �����, �����������," +
" ��� ������� ��� ��� ����, �� � ����, ��� ������ �������� ��� �����.",

// ����
"����� ���� ��� ���������, � ���� ���� �������� ��������. ����� � ���� ������ �� � �����. ����� ��� �����������" +
" ������, �� ������ ����� �������� � ��������� � ���� ������� ����� ���������.",

"������� ����� ��������, �� ���� ��� ����� �� �����, ������ ��� ��� ������ ������� ������� ������� �������� � �����" +
" ������ �������, ���� ��������� ����� �� � ������. ������ ��� ����� �� ����� � ����� �� ������� �����. ����� ������� �����.",

"� ��� ��� ����� �� �����-�� �������� ��� ���. �� ��� ���� ������������. � ���� �� �������������, ����� �� �������� �������� ����. �� ��� ������.",

"� �����, � ������� ����, ��������� � �������� �������. �� ����������� ����� ����� �����, ������� ������ ��� ������� �����. ����� ������ �� ��� ��� �������, ��� �� ������� ��������.",

"� �������� ������ �� ����� �� �������, � ������� ����. ��� ����� �������� ���, ��� ����� ����� ��� ��. ���� �� �� ��� ��� �����������" +
" � ������������ ��� ���������. � ����� � ������� �� ����� ������ �����.",

// ����
"���� ����� ������ ��� �� ���. ������ ���������� ��������� ������� ������� ����." + 
" ���� ������ �� ������ � �� �����, ��� �� �������� ���-�� �������������� � ���� ����, ��� � ��� ������." + 
" ������ �� ���� ����� ����� ���� �����. �����, ��� ��� ����� ����� ������� ��� ��� ���� ����������� �����.",

"����� ����� ��� ������ ��������� ����, ������������� ������ ����� ����. ���� �����, ���� ��� ������ ������ ��� ����." +
" Ҹ���� �������-�� ������������ ������ ������ � ��� � ������� �������� ��������.",

"���������, ��� �� �������� � ��� �� ����� ��������� ���� ������, � ������ ����, ������� �� ���� �� ���� ������," +
" � ������� �����, ����������� �� ����� ����, ������ ����.",

"�, �������-��, ������ ��������. ������������ �� �� �� �� �����������?� - ����� ���������� � ��� ������, ����� ��� ����� ����� �� ��������� � ����.",

"���!� - ������� � ��������������� ������� �� � ����� ������ �����, ��-�������� ������ ��� �� ������� �����. �� ��� ������, ������ �� ����� ���� �����.",


// ��������
"� ����� ������� �� ������. � �� ���������� ��� ������ ����� ����. ���� �� ����� �������� �������, � �������� � ������.<br/>" +
"� ��� ������� �� ��������� ���� �����. � ���� �������� �������, ������� �� ������� ������ � �� ���� ��������� ��������� � ���� ������, ��� ��������� �� ��� ���������� � �����.",

"� ��� ���������� �����������. �� ������� ���� ����, ��� ��� ������ ������ �� �������.<br/>" +
"� ������, �� ������, ����� � ����� ���� ������� ������ �� ������, ���� ������?<br/>" +
"� ����������, � ���� �������� �� ���� ������ ������ ���������, ��� ������� �� ��� �� ���� ��������.",

"� ���� ����, �� ����������� ��� ������ ��� �������������� ����� ������, � ������� � �� ����.<br/>" +
"� �, ��������, � ���� �� �����.<br/>" +
"� ������.<br/>" +
"� ���, ��� �� ������, �� ������ ��������, ��� ��� ������, � ����� � �� ������ �������.",

"� ��� ��������, ��� � ������ ������?<br/>" +
"� ��� ��������, �� � �� ���.<br/>" +
"� ���� �������<br/>" +
"� �������, � ���������� ����.",

"� � �� ����, ��� ���-�� ���������.<br/>" +
"� ��, ��� ���? ������� �� ������? � �������� ��������, ������ ��������� �� �����," +
" ������������, ��� �� ���� ��� �� ����� ����������.",

// ����������
"������� � ��������� ��������� �������, ����������, ������� ��� ��������, ������� � ������� �����:<br/>" + 
"� ��� ����� ����� ��� �����! ��� ����� ��� �������. ��, ��� ���������� �����! � ���������� ������ ������ ���������� ��������.",

"����� �� ��� ���������? � ����������� ������� ����� �����.<br/>" + 
"� ������ � ������, ���������, �� ����� �� �������������, �� ��������." + 
" ��� � ��� �� ���� � �����, �� ����������. ������ �������, ����, �� ���." + 
" ���� ������ � ����. � ��������� ��������� ����������, ������� �������� ���������������� � ��� ���������.",

"� ��! � ��� ����� �������� � ���������� � ���� ������������ ��������. � ��� ������� ������" + 
" �������, ��� �� ������ �� ������, ����� ������! � ����� �������, �����������, � ������� �����" + 
" �������� �� �����, ��������� ���� ��������. ",

"� ����! � ����� ��������� �������� �� �����, � ������ ����� ������.<br/>" + 
"� � ����! ",

"� ����� ��� �� ���? � ������� ���� �� ����������� �������.<br/>" + 
"� ��� ������� ������� � �������.",

"�� ������ ������ ������ ��������� �������. �������� � ���� �������, �������� ������" +
" � ���, ��� ���� ��� ���, ��� ��� ��� ����. ���� ��������� ������ �� ������ � �� ������.",

"��� ������ ��������, ��� �� ����� �������, ��� ��� ����� ���� ����������." +
" ��� ����� ���� ���� ����� �� ��������, ��� ����, ����� �� ����������, ��� ����.",

"������� ��� ������, ������ ��� ��������� ���� ���������, ������ ��� �� ����� ����. �����" +
" �� ������ �����������, ��� ����� �������� � ����, ������������ � ������ ������, �������� �������� ����, ��� ��������� � �����.",

"����, ��� ���� ������ �� ������, � ��� ������� ���� �����.<br/>" +
"� ����������, � ������ �� ����, � ��� ����� ���������� �� ���� � �����������.",

"������ ��� ��������� ����� ���, ������ ��� �� �� ��� �� ����������, ��� ������, ����� � ����� ������ ���. ��� �������" +
" ���, ����� ���� ��� ����� ����������. ������� ���, ����� ����� ������ � ���� �� �� ��������, ������� � ���. ",

// �����
"����� �� ������, ��� �������� �����, � ������� �������� ��������. ������� �������� � ������ ��������" +
" �������, � ��� �������� ��� � ��� �������. �� �� ����� ������� ���������, ����� ��� ���� ������ ��" + 
" ��� �������� ���������� ������� � �������, ��� �� �������� ���� ������-�� �������.",

"����� ��� � ���� �������, ������� ��� �������� ������ ������������� ����� ������ ����." + 
" ���� ��� ���� ���������� ���� ������-�� ����������, ���� ���� �����, �� ��� �������� ������ ������� ����." +
" ������ ����� ������ ��������� ����������� � ����� �����. ������ �� ��� �������� ����.",

"����� ������� ���-�� ���������. ������ ����� �������, ��� ��� ������������, �� ����� ����������. � ���. � ���.",

"������ ���������� ���������, ���� ����� �� ������ �� �������� �������, ����������� �������. ������� � �����." + 
" ����� ���� ������� ���� � ������, ��� ����� ����� ���� �� ������ �� ��������� �� � �� ����� ���.",

"����� ���� ���������� �� ����������, ��� �������� �������� ������� �������. � ���� �� ������ ����" +
" � ������, � ���� ������������ ����� �������� ����. �� ���������....<br/>" +
"� �������� ������ ������ �����, ����. ��� ������ �������.<br/>" +
"��� ��� ����� ���� ���.",

// ��� 
"����������� ���! ��� ����� ��� �����-��, ��� ������ ���� ����� ��� �����-��.<br/>" +
"� ���-��� ����, ������ ��������! � ��� �������� ������� ������ ������ ��������� ��" +
" ���������� ������������, ��� ����� ��������� ��� ������ ������� ��������, ��������� ����� �������������" +
" � �� �� ��������, �� �� �����-������ ������.",

"� �����-�����, �����, ��� ����. � ������� �������������, ��� ����� �� ����. ������ ����������� ��������� ��� �����," +
" � �������� ��������� ������� � ������� ������ �������.",


"��� ������ ������ ��� ������, � ������� �� �������� ��� ����� ������� �� �������, �������� ����� �� ����� �" +
" ����������� ������� ������� ����. ��� ����� � ���� ��� ������ �����, ���������� ��������� ������� ������� �������," +
" ��� ��� ����� ����� � ���� ���� � ��������, ��� � ������.",

"��� ����� � ������� ��� ����� ������ �����, ������ ��� � �����������, �� ����� ���������� ������� ��� �� ����, �� ��� ������." +
" ��� ������� �������, �������� � ��������, � ���������� ����� � �������� �� � ��� �����.",

"� ���, �����-�����, ������� �����. � �� ������� ��������� ��� �������� �� ������� ����������, ������ ������� ����� ��� �����," +
" � ������� �������� ��������� ������, ������, ����� �� ��������� ���� ����� ��� ���������.",

// ����
"����� �� ��������� ��������� ������� �������� ���������� �� ������ ������� ��� ���� ����� ������������." +
"  �� ����� ���� ������ ������ ����� ������������ ������ ������� � ���.",

"�� ������ ���� �����������, ��������� ����� �����, � ����� ������ ���� ������ �� ���� �������. �� ������� ����," +
" ������ � ������� ���� � �� ������ ��������� �� �����������. ��� � ������ ���. ���� ��������, ������� �� �������� �����������. ",

"������ ��� �� ������������ ��� �� ����������������� ��������� � ���������� ������ � ���, ����� ����� ����" +
" ������������ ����.  ���������, ��� �� ��� ������ ��� �����, �� ������ ���� ��� ���-�� ���. ",

"���� ������� ����� ���������� ��, ��������. �� ������ � ����, �� ��� �� ���� ��� � �� ������. �� ���������" +
" �����������, �� ���� �� �����, ��� ���������� ���.  ������ ��� ���� � ����, � ���� ��� ��������� ���������, ���������.",

" �� �������� �� ��������� � ����� ����, ������� �������� ��� ��������� �����.<br/>" +
"� �������, �� ��������� �����.",

// ������
"� ������, � ������ ������ ���� ���?<br/>" +
"� �� ����, ������. ����� ������ ���� �����-�� ��������� �������?",

"� �� �������! �� ����� ���� ������ ������, ������� �� �� ��� ���?<br/>" +
"� ���, �� �����.<br/>" +
"� ���! �� �� �����! ������, ����� ���� �����-�� �������. ����������� ����. � ������ ������ ���? ������ �� ������? ��� ��������� ���� ������ ���.",

"� ����� ����, �� ������ �������� ��� ����?<br/>" +
"� ���, �� ����� ����? ��� ��� ������ �������� ������ ����, ������� ������. �� ����� ���� ���� ������ �� �����.<br/>" +
"� ��, �� � �� �����.",

"� �� � ���? �� � ���, ��� � �� �����? �� �� ���� ������� �� ��������. ���� ������� ���� � ���, ��� ��� ������, � �� �� �����.<br/>" +
"� �� ��. �������� ��� ���.",

"� ��� �� ��� � �����? ����������� ���� ���������.<br/>" +
"� ���� � ������ ���, �����, ��������� ���."
);		
var num_pr;										//����� ��������� �������			
//---------------------------�������, �����-----------------------------------------------
function handleKeyDown(event) 
{
	currentlyPressedKeys[event.keyCode] = true;
}
	 
function handleKeyUp(event) 
{
    currentlyPressedKeys[event.keyCode] = false;
}

function move_obj(num, sp, mas_m)
{
	for(var v = 0; v < num; v++) mas_m[v] -= sp;
}
function handleKeys() 
{
	if (currentlyPressedKeys[80] && flag) 
	{
		Pause();
		currentlyPressedKeys[80] = false;
	}
	if(document.getElementById('over').style.display!='block'&&flag&&fl_p&&!cl_st)
	{
		if (currentlyPressedKeys[68]) 
		{
			posx_m -= 1;
			move_obj(kol, s_m, mas_mon);
			move_obj(11, s, mas_fon);
			move_obj(kol_b, s_b, mas_br);
			move_obj(kol_br, s_br, mas_brev);
			move_obj(kol_ya, s_ya, mas_yac);
			if(fl_shit) go += s;
			s_x--;
			met += s;
			for(var f = 0; f<8; f++)
			{
				mas_shu[f] = Math.floor((Math.random()*10)-5) + posy_m;
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
    }
    if (currentlyPressedKeys[68]&&!flag&&rab) 
	{
		flag = 1;
	}
	if(currentlyPressedKeys[13])
	{
		Close();
	}
}

//---------------------------������������� �����-----------------------------------------
function init_GL()
{
	canvas=document.getElementById("canvas");
	gl=getWebGLContext(canvas);
	if(!gl)
	{
		alert('���� �������� ��������� ��� ���� ����� ����� �� ����������� WebGL!');
		return;
	}
	
	gl.enable ( gl.BLEND ) ;
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	//-------------------------����� ������� ����-----------------------------------------
	y_m = Math.floor((Math.random()*400)+10);
	kol = Math.floor((Math.random()*10)+1);
	mas_mon[0] = Math.floor((Math.random()*700)+500);
	mas_fl[0] = 1;
	for(var i = 1; i < kol; i++) 
	{
		mas_mon[i] = mas_mon[i-1] + 50;
		mas_fl[i] = 1;
	}
	
	//-----------------------���� ����----------------------------------------------------
	for(var i = 0; i < 11; i++) 
	{
		mas_fon[i] = 700*i;
		mas_fon_fl[i] = 0;
	}
	mas_fon_fl[0] = 1;
	mas_fon_fl[1] = 1;
	
	//----------------------����� ����----------------------------------------------------
	kol_b = Math.floor((Math.random()*10)+1);
	mas_br[0] = Math.floor((Math.random()*700)+500);
	mas_br_y[0] = Math.floor((Math.random()*400)+10);
	mas_br_fl[0] = 1;
	for(var i = 1; i < kol_b; i++)
	{
		mas_br[i] = mas_br[i-1] + Math.floor((Math.random()*200)+50);
		mas_br_y[i] = Math.floor((Math.random()*400)+10);
		mas_br_fl[i] = 1;
	}
	
	//---------------------�������� �����������-------------------------------------------
	for(var f = 0; f<8; f++)
	{
		mas_shu[f] = Math.floor((Math.random()*10)-5) + posy_m;
	}
	
	//---------------------������ ����----------------------------------------------------
	kol_br = Math.floor((Math.random()*2)+1);
	mas_brev[0] = Math.floor((Math.random()*700)+700);
	for(var i = 1; i < kol_br; i++)
	{
		mas_brev[i] = mas_brev[i-1] + Math.floor((Math.random()*300)+100);
	}
	
	//---------------------����� ����----------------------------------------------------
	kol_ya = Math.floor((Math.random()*2)+1);
	mas_yac[0] = Math.floor((Math.random()*700)+600);
	for(var i = 1; i < kol_ya; i++)
	{
		mas_yac[i] = mas_yac[i-1] + Math.floor((Math.random()*300)+100);;
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
//---------------------------�������--------------------------------------------------
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
//---------------------------���������------------------------------------------------
var pos = 0;
var kon = 20;
var kl = 0;
function drawScene()
{	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	if(!code)
	{
		if(go>1200){ fl_shit = 0; go = 0; }															//������ ���������
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
		if(rab != 0)													//������ �� �����!
		{
			if(posx_g-80<=posx_m&&posx_g>=posx_m||fl_over) gameOver();	//�� ���� �� �����������?)
			else
			{
				if(flag&&fl_p&&!cl_st)									//����� �� ��� �������?)
				{	
					move_obj(kol, s_m, mas_mon);
					move_obj(11, s, mas_fon);
					move_obj(kol_b, s_b, mas_br);
					move_obj(kol_br, s_br, mas_brev);
					move_obj(kol_ya, s_ya, mas_yac);
					if(fl_shit) go += s;
					s_y++;
					met += s;
					for(var f = 0; f<8; f++)
					{
						mas_shu[f] = posy_m + Math.floor((Math.random()*10)-5);
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
					posx_m += 1;
				}
				var i;
				
				//---------------------���----------------------------------------------------------
				if(mas_fon[10] <= 0)
				{
					for(var j = 0; j < 11; j++) 
					{
						mas_fon[j] = 700*j;
						mas_fon_fl[j] = 0;
					}
					mas_fon_fl[0] = 1;
					mas_fon_fl[1] = 1;
				}
				
				for(i=0; i<11; i++)
				{
					if(mas_fon_fl[i])
					{
						pov(mas_fon[i], 0, 700, 465, i);
					}
					if(mas_fon[i] < -700)
					{		
						mas_fon_fl[i] = 0;
						mas_fon_fl[(i + 2) % 11] = 1;
					}
				}
				//---------------------�������------------------------------------------------------
				i = 25;
				if(mas_mon[kol - 1] < -100)
				{
					y_m = Math.floor((Math.random()*400)+10);
					kol = Math.floor((Math.random()*10)+2);
					mas_mon[0] = Math.floor(700 + Math.random()*1000);
					mas_fl[0] = 1;
					for(var v = 1; v < kol; v++)
					{
						mas_mon[v] = mas_mon[v-1] + 50;
						mas_fl[v] = 1;
					}
				}
					
				for(var q = 0; q<kol; q++)
				{
					if(mas_fl[q])
					{
						if(posy_g>=y_m-100 && posy_g<=y_m+50 && posx_g<=mas_mon[q] && posx_g>=-50+mas_mon[q])
						{
							bal ++;
							document.getElementById("bal").innerHTML = bal;
							mas_fl[q] = 0;	
						}
						pov(mas_mon[q], y_m, 50, 50, i);
					}
				}
				//---------------------������----------------------------------------------------------
				i = 26;
				var f = 0;
				for(var gk = i; gk < k - 1; gk++)
				{
					if(gk==26) pov(posx_m, posy_m, 200, 200, gk);
					else { pov(posx_m, mas_shu[f], 200, 200, gk); f++};
				}
				//---------------------�����---------------------------------------------------------
				i = 24;
				
				if(mas_br[kol_b - 1] < -100)
				{
					var asd = 0;
					for(var q = 0; q<kol_b; q++)
					{
						asd++;
					}
					if(asd == kol_b) if(posx_m-10>=0) posx_m -= 6;
					kol_b = Math.floor((Math.random()*10)+1);
					mas_br[0] = Math.floor((Math.random()*700)+500);
					mas_br_y[0] = Math.floor((Math.random()*400)+10);
					mas_br_fl[0] = 1;
					for(var i = 1; i < kol_b; i++)
					{
						mas_br[i] = mas_br[i-1] + Math.floor((Math.random()*200)+50);
						mas_br_y[i] = Math.floor((Math.random()*400)+10);
						mas_br_fl[i] = 1;
					}
				}
					
				for(var q = 0; q<kol_b; q++)
				{
					if(mas_br_fl[q])
					{
						if(posy_g>= mas_br_y[q]-80 && posy_g<= mas_br_y[q]+40 && posx_g<=mas_br[q] && posx_g>=-50+mas_br[q])
						{	
							if(!fl_shit)
							{
								mas_br_fl[q] = 0;
								posx_m += 5; 													//���� ���� �� �������
							}
						}
						pov( mas_br[q], mas_br_y[q], 50, 50, i);
					}
				}
				//---------------------�����--------------------------------------------------------
				pov(posx_g,posy_g, 100, 100, rab);
				
				//-----------------------------------������---------------------------------------------------
				i = k - 3;
				if(mas_brev[kol_br - 1] < -200)
				{
					kol_br = Math.floor((Math.random()*2)+1);
					mas_brev[0] = Math.floor((Math.random()*700)+700);
					for(var j = 1; j < kol_br; j++)
					{
						mas_brev[i] = mas_brev[i-1] + Math.floor((Math.random()*300)+100);
					}
				}
				for(var j = 0; j<kol_br; j++)
				{
					if(posy_g + 50 >= 370 && posy_g <= 370 + 100 && posx_g <= mas_brev[j] + 160 && posx_g + 30 >= mas_brev[j])
					{	
						fl_over = 1;
					}
					pov(mas_brev[j], 370, 200, 100, i);
				}
				
				//-----------------------------------�����---------------------------------------------------
				i = k - 2;
				if(mas_yac[kol_ya - 1] < -100)
				{
					kol_ya = Math.floor((Math.random()*2)+1);
					mas_yac[0] = Math.floor((Math.random()*700)+700); 
					for(var j = 1; j < kol_ya; j++)
					{
						mas_yac[j] = mas_yac[j-1] + Math.floor((Math.random()*300)+100);
					}
				}
				for(var j = 0; j<kol_ya; j++)
				{
					if(posy_g + 50 >= 0 && posy_g<= 165 && posx_g + 50 >= mas_yac[j] && posx_g<=30+mas_yac[j])
					{	
						fl_over = 1;
					}
					pov(mas_yac[j], 0, 84, 200, i);
				}
				
				//------------------------------�����!!!------------------------------------------------------		
				i = k - 1;
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
					
				//------------------------------�����������----------------------------------------------------
				i = 23;
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
		}
	}
}


function main()
{
	Start();
	
	document.getElementById("p2").innerHTML = mas_pr[num_pr];	
	document.getElementById("p5").innerHTML = "���� ����������� �������� <a href=\"http://fk-2o13.diary.ru/?tag=4902746\">fandom Pirates of the Caribbean 2013</a> ��� ��������� ����� - 2013 �� <a href=\"http://www.diary.ru/\">diary.ru</a> <br/>";
	//-----------------���� ���� js!! � ������ �� �����������, ������ -___---------------
	
	var texturesPaths = 
	[
	// ���
	"back_01.jpg", "back_02.jpg", "back_03.jpg", "back_04.jpg", "back_05.jpg",
	"back_06.jpg", "back_07.jpg", "back_08.jpg", "back_09.jpg", "back_10.jpg",
	"back_01.jpg",
	// ������
	"1.png", "2.png", "3.png", "4.png",  "5.png",  "6.png", 
	"7.png", "8.png", "9.png", "10.png", "11.png", "12.png",
	// ����������
	"pol.png", "br.png", "den.png", 
	"kraken0.png", "kraken1.png", "kraken2.png", "kraken3.png",
	"kraken4.png", "kraken5.png", "kraken6.png", "kraken7.png", "kraken8.png",
	"brev.png", "yac.png", "sv.png"
	];

	for(var i = 0; i < 38; i++)
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

//----------------------------------------������ ���. ����------------------------------
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
	}
	else
	{
		if(num) document.getElementById(g).width="110";
		else document.getElementById(g).width="100";
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
	document.getElementById('p3').innerHTML = "��� ���������!<br/><br/>���������� �����......" + bal + "<br/>�������� ������......." + met + "<br/>������� �������......." + his;
	
	var s = "<textarea autofocus=\"autofocus\" id=\"inptext\" style=\"width:100%; height:100px; \" ><div style = \"width: 200px; height: 150px; color: #000; front-size: 10px; border-radius: 4px; background-color:#716a21; box-shadow: 2px 2px 6px #333, inset 0px 0px 10px #a89130; border: 1px solid #a18f52; filter: alpha(opacity=98); -moz-opacity: 0.98; -khtml-opacity: 0.98; opacity: 0.98;\" align=\"center\" ><img src=\"http://i.pixs.ru/storage/5/6/9/boardpng_6311240_8715569.png\" style = \"margin-top: 5px; \"><p style = \"margin-top: -23px; font-size:16px;\">��� ���������!</p><p>";
 s += "<table cellpadding = 2> <tr><td>���������� �����</td><td width='20px' align=\"right\">" + bal + "</td></tr>";
 s += "<td>�������� ������</td><td width='20px' align=\"right\"> " + met + "</td></tr><tr>";
 s += "<td>������� �������</td><td width='20px' align=\"right\">" + his + "<td></tr></table>";
 s += "<p><p><p><a href=\"http://potc-game.herokuapp.com/\">������ �����?</a>";
 s += "</div></textarea>";
	document.getElementById("p6").innerHTML=s;
	return false;
}

function over()
{
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
	var sr = "<b>B������������� �������!</b><br/>";
	if(his<5)
	{
		sr += mas_str[(rab-11)*5+his];
	}
	else
	{
		sr += "�� ������ ��� �������! <br/>���� �� ��� ������,<br/>��� �� ������������ ���� �� ���� ������, ��� ���<br/>������� ����� � ������ ���� �������!!!";
	}
	document.getElementById("p4").innerHTML = sr;
	document.getElementById('wind_story').style.display='block';
	cl_st = 1;
	his++;
	return false;
}
//----------------------��������� ���, �������� ��� ������!-----------------------------
function Start()
{
	posx_g = 200; 
	posy_g = 350;
	posx_m = 0; 
	posy_m = 260;
	bal = 0;
	rab = 0;
	flag = 0;
	fl_p = 1;
	s = 1;										
	s_m = 2;									
	s_b = 3;
	s_br = 2;
	s_ya = 2;
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
}

//------------------------------------�������� �� �����---------------------------------
function Pause()
{
	if(flag) if(fl_p) fl_p = 0; else fl_p = 1;
}

//-------------------------------------����� ����---------------------------------------
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

//------------------------------------�� ���� � ����������------------------------------
function About()
{
	document.getElementById('wind_about').style.display='block';
	return false;
}

//-------------------------------------�������� ������----------------------------------
function List()
{
	if(num_pr == mas_pr.length - 1)  num_pr = 0;
	else num_pr++; 
	document.getElementById("p2").innerHTML = mas_pr[num_pr];
	return false;
}
