export default (props, { $f7, $on }) => {
    const title = 'Component Page';
    const names = ['John', 'Vladimir', 'Timo'];

    const openAlert = () => {
      $f7.dialog.alert('Hello world!');
    }

    $on('pageInit', () => {
    //撮影関連
    startbutton = document.getElementById('startbutton')
    startbutton.addEventListener('click', takePicture, false);
    function takePicture(){
  var option = {
    destinationType: Camera.DestinationType.DATA_URL, 
    encodingType: Camera.EncodingType.JPEG,
    //saveToPhotoAlbum: true, //撮影後端末に保存
    correctOrientation: true // 撮影時と同じ向きに写真を回転
  };

  //カメラを起動
  navigator.camera.getPicture(onSuccess, onError, option);

  //成功時に呼び出されるコールバック関数
  function onSuccess(imageData){
    if (typeof(imageData) != 'undefined' && imageData != '') {
      $("#pic").attr("src","data:image/jpeg;base64," + imageData);
    }
  }

  //失敗時に呼び出されるコールバック関数
  function onError(message){
    alert("Error:" + message);
  }
 }
    start = document.getElementById('start')
    start.addEventListener('click', takePictures, false);
    function takePictures(){
        alert("syokuzai");
    }
    //調味料関連
    var genre=['上白糖', 'グラニュー糖','食塩', '穀物酢', 'こいくちしょうゆ', '麦みそ', '本みりん', 'トマトケチャップ', 'マヨネーズ（全卵）'];
     var gramchange = {};
     gramchange = {
      '上白糖' :3, 'グラニュー糖':4, '食塩':6, '穀物酢':5, 'こいくちしょうゆ':6, '麦みそ':6, '本みりん':6, 'トマトケチャップ':5, 'マヨネーズ（全卵）':4
     };

     for(var i =0;i < genre.length; i++){
      var liElement = document.createElement("li"); // li要素作成
      var labelElement = document.createElement("label"); // label要素作成
      labelElement.setAttribute("class","item-checkbox item-content"); // label要素にidを設定            
      var itemElement = document.createElement("div"); // div要素作成
      itemElement.setAttribute("class","item-inner"); // div要素にidを設定            
      var nameElement = document.createElement("div"); // div要素作成       
      var nameContent = document.createTextNode(genre[i]); // テキストノードを作成
      nameElement.appendChild(nameContent); // div要素にテキストノードを追加
      nameElement.setAttribute("id","SeasoningName"); // div要素にidを設定
      nameElement.setAttribute("class","item-title"); // div要素にclassを設定      
      var newElement = document.createElement("input"); // input要素作成
      newElement.setAttribute("type","checkbox");// input要素のtypeを設定     
      newElement.setAttribute("name","SeasoningName");// input要素のnameを設定   
      newElement.setAttribute("value",genre[i]);// input要素のvalueを設定          
      newElement.setAttribute("id","child-p1"); // input要素にidを設定
      var iElement = document.createElement("i"); // i要素作成
      iElement.setAttribute("class","icon icon-checkbox"); // i要素にidを設定       
      // ----------------------------
      // 親要素の後に追加します
      // ----------------------------
      // 親要素（div）への参照を取得
      var parentDiv = document.getElementById("checkbox");
      // 追加
      parentDiv.appendChild(liElement);      
      liElement.appendChild(labelElement);
      labelElement.appendChild(newElement);
      labelElement.appendChild(iElement);
      labelElement.appendChild(itemElement);     
      itemElement.appendChild(nameElement);            
    }
    
      $(function(){
        $('#button1').click(function(){
          $('.checked').empty();
          $('[name="SeasoningName"]:checked').each(function(index,element){
            $('.checked').append('<p class = "season-center">' + $(element).val() + '</p>');
            
            $('.checked').append('<table align="center">'+'<tr>'+'<th>'+'小さじ'+'</th>'+'<th>'+'大さじ'+'</th>'+'</tr>' +'<tr>'+'<td>'+ '<input type="number" name="Teaspoon" placeholder="0" min="0" step="0.25">'+'</td>'+'<td>'+ '<input type="number" name="Tbsp" placeholder="0" min="0" step="0.25">'+'</td>'+'</tr>'+'</table>' );
          });
          //$('.checked').append('<input type="button" class = "button2"value="ボタン">');            
        });
      });  

      $(document)
      $(function () {
        $('#button2').click( function() {
          $('.gram').empty();
          var SelectSeasoning = [];
          $('[name="SeasoningName"]:checked').each(function(index,element){
            //alert($(element).val());
            SelectSeasoning.push($(element).val());
          })    
            var obj = new Object();
            var Changegram = [];
          // テキストボックスのデータを取得
            for(var i =0;i < genre.length; i++){
              if ((Number($(document.getElementsByName('Teaspoon')[i]).val()) > 0) || (Number($(document.getElementsByName('Tbsp')[i]).val()) > 0)) {              
                var getData = Number($(document.getElementsByName('Teaspoon')[i]).val()) + Number($(document.getElementsByName('Tbsp')[i]).val())*3;
                Changegram.push(gramchange[SelectSeasoning[i]] * getData);

                //調味料の種類確認用alert
                //alert(SelectSeasoning[i]);
                //調味料のグラム確認用alert
                //alert(Changegram[i]);

                //localStorage使用のためのプログラム(今回不使用)//
                var array = [];
                obj[SelectSeasoning[i]] = Changegram[i];
                array.push(obj);
                var setjson = JSON.stringify(obj);
                localStorage.setItem('キー',setjson);
                /////////////////////////////////////////////////

                var postElement = document.createElement("input"); // input要素作成
                postElement.setAttribute("type","hidden");// input要素のtypeを設定     
                postElement.setAttribute("name",SelectSeasoning[i]);// input要素のnameを設定   
                postElement.setAttribute("value",Changegram[i]);// input要素のvalueを設定
                parentDiv.appendChild(postElement);                
              }
            }
          //})
        });
      });
      
    //ファイル関連
    $('input').on('change', function () {
     var file = $(this).prop('files')[0];
     $('#file_name').text(file.name);
    });
    /////////////////////////////////////



    });
    $on('pageAfterOut', () => {
      // ページがビューから離れた
    });

    // コンポーネント関数はレンダリング関数を返さなければならない
    return $render;
  }