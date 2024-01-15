import zh from '@/assets/multi_lan/zh.json'
import en from '@/assets/multi_lan/en.json'
import es from '@/assets/multi_lan/es.json'
import ar from '@/assets/multi_lan/ar.json'
import hi from '@/assets/multi_lan/hi.json'
import id from '@/assets/multi_lan/id.json'
import pt from '@/assets/multi_lan/pt.json'
import th from '@/assets/multi_lan/th.json'
import tr from '@/assets/multi_lan/tr.json'
import vi from '@/assets/multi_lan/vi.json'
const lans = {
    'zh':zh,
    'en':en,
    'es':es,
    'ar':ar,
    'hi':hi,
    'id':id,
    'pt':pt,
    'th':th,
    'tr':tr,
    'vi':vi,
}

const currentLanguage = function(){
   if(localStorage.getItem('currentLanguage')==null){
      localStorage.setItem('currentLanguage','zh');
   }
   return localStorage.getItem('currentLanguage');
}
const multiLan = function(str,...args){

//    var primaryLanguage = navigator.language || navigator.userLanguage
//   let lan = primaryLanguage.split('-')[0];
   let value = lans[currentLanguage()][str];
   if(value==null){
      console.log('value null');
      return '';
   }
   if(args.length==1){
      value = value.replace('xx',args[0]);
   }else if(args.length>1){
      for(let i=0;i<args.length;i++){
         value = value.replace('xx'+(i+1),args[i]);
      }
   }
   if(value==''||value==null) value = '未翻译';
  return value;
}
export{ multiLan,currentLanguage};