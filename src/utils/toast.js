const toast = function (msg) {
    const html = '<span style="background-color:#A1A1A1;color:white;border-radius:5px;padding:5px;left:0;right:0;margin:auto">'+msg+'</span>';
   const div = document.createElement('div');
   div.style.position = 'fixed';
   div.style.left = '0';
   div.style.right = '0';
   div.style.top = '0';
   div.style.bottom = '0';
   div.style.width = '100%';
   div.style.height = '35px';
   div.style.margin = 'auto';
   div.style.textAlign = 'center';
   div.setAttribute('id','toast.div')
    div.innerHTML = html;
    document.body.append(div)
    setTimeout(function(){
        div.remove();
    },2000);
}
export default toast;