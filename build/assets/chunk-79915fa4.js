import{g as b,a as k}from"./chunk-23102255.js";import{m as z}from"./chunk-8eed5aa2.js";class y{constructor(e,t){this._value=e,this.bytesReadCount=t,this.length=e.length}toString(){return this._value}}var U={readUTF16String:function(s,e,t){var r=0,i=1,a=0;t=Math.min(t||s.length,s.length),s[0]==254&&s[1]==255?(e=!0,r=2):s[0]==255&&s[1]==254&&(e=!1,r=2),e&&(i=0,a=1);for(var n=[],o=0;r<t;o++){var l=s[r+i],g=s[r+a],c=(l<<8)+g;if(r+=2,c==0)break;if(l<216||l>=224)n[o]=String.fromCharCode(c);else{var u=s[r+i],d=s[r+a],f=(u<<8)+d;r+=2,n[o]=String.fromCharCode(c,f)}}return new y(n.join(""),r)},readUTF8String:function(s,e){var t=0;e=Math.min(e||s.length,s.length),s[0]==239&&s[1]==187&&s[2]==191&&(t=3);for(var r=[],i=0;t<e;i++){var a=s[t++];if(a==0)break;if(a<128)r[i]=String.fromCharCode(a);else if(a>=194&&a<224){var n=s[t++];r[i]=String.fromCharCode(((a&31)<<6)+(n&63))}else if(a>=224&&a<240){var n=s[t++],o=s[t++];r[i]=String.fromCharCode(((a&255)<<12)+((n&63)<<6)+(o&63))}else if(a>=240&&a<245){var n=s[t++],o=s[t++],l=s[t++],g=((a&7)<<18)+((n&63)<<12)+((o&63)<<6)+(l&63)-65536;r[i]=String.fromCharCode((g>>10)+55296,(g&1023)+56320)}}return new y(r.join(""),t)},readNullTerminatedString:function(s,e){var t=[];e=e||s.length;for(var r=0;r<e;){var i=s[r++];if(i==0)break;t[r-1]=String.fromCharCode(i)}return new y(t.join(""),r)}},N=U;const F=N;let W=class{constructor(){this._isInitialized=!1,this._size=0}static canReadFile(e){throw new Error("Must implement canReadFile function")}init(e){var t=this;if(this._isInitialized)setTimeout(e.onSuccess,1);else return this._init({onSuccess:function(){t._isInitialized=!0,e.onSuccess()},onError:e.onError})}_init(e){throw new Error("Must implement init function")}loadRange(e,t){throw new Error("Must implement loadRange function")}getSize(){if(!this._isInitialized)throw new Error("init() must be called first.");return this._size}getByteAt(e){throw new Error("Must implement getByteAt function")}getBytesAt(e,t){for(var r=new Array(t),i=0;i<t;i++)r[i]=this.getByteAt(e+i);return r}isBitSetAt(e,t){var r=this.getByteAt(e);return(r&1<<t)!=0}getSByteAt(e){var t=this.getByteAt(e);return t>127?t-256:t}getShortAt(e,t){var r=t?(this.getByteAt(e)<<8)+this.getByteAt(e+1):(this.getByteAt(e+1)<<8)+this.getByteAt(e);return r<0&&(r+=65536),r}getSShortAt(e,t){var r=this.getShortAt(e,t);return r>32767?r-65536:r}getLongAt(e,t){var r=this.getByteAt(e),i=this.getByteAt(e+1),a=this.getByteAt(e+2),n=this.getByteAt(e+3),o=t?(((r<<8)+i<<8)+a<<8)+n:(((n<<8)+a<<8)+i<<8)+r;return o<0&&(o+=4294967296),o}getSLongAt(e,t){var r=this.getLongAt(e,t);return r>2147483647?r-4294967296:r}getInteger24At(e,t){var r=this.getByteAt(e),i=this.getByteAt(e+1),a=this.getByteAt(e+2),n=t?((r<<8)+i<<8)+a:((a<<8)+i<<8)+r;return n<0&&(n+=16777216),n}getStringAt(e,t){for(var r=[],i=e,a=0;i<e+t;i++,a++)r[a]=String.fromCharCode(this.getByteAt(i));return r.join("")}getStringWithCharsetAt(e,t,r){var i=this.getBytesAt(e,t),a;switch((r||"").toLowerCase()){case"utf-16":case"utf-16le":case"utf-16be":a=F.readUTF16String(i,r==="utf-16be");break;case"utf-8":a=F.readUTF8String(i);break;default:a=F.readNullTerminatedString(i);break}return a}getCharAt(e){return String.fromCharCode(this.getByteAt(e))}getSynchsafeInteger32At(e){var t=this.getByteAt(e),r=this.getByteAt(e+1),i=this.getByteAt(e+2),a=this.getByteAt(e+3),n=a&127|(i&127)<<7|(r&127)<<14|(t&127)<<21;return n}};var B=W;const H={},X=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"})),G=b(X),R=-1;let $=class{static get NOT_FOUND(){return R}constructor(){this._fileData=[]}addData(e,t){var r=e+t.length-1,i=this._getChunkRange(e,r);if(i.startIx===R)this._fileData.splice(i.insertIx||0,0,{offset:e,data:t});else{var a=this._fileData[i.startIx],n=this._fileData[i.endIx],o=e>a.offset,l=r<n.offset+n.data.length-1,g={offset:Math.min(e,a.offset),data:t};if(o){var c=a.data.slice(0,e-a.offset);g.data=this._concatData(c,t)}if(l){var c=g.data.slice(0,n.offset-g.offset);g.data=this._concatData(c,n.data)}this._fileData.splice(i.startIx,i.endIx-i.startIx+1,g)}}_concatData(e,t){if(typeof ArrayBuffer<"u"&&ArrayBuffer.isView(e)){var r=new e.constructor(e.length+t.length);return r.set(e,0),r.set(t,e.length),r}else return e.concat(t)}_getChunkRange(e,t){for(var r=R,i=R,a=0,n=0;n<this._fileData.length;n++,a=n){var o=this._fileData[n].offset,l=o+this._fileData[n].data.length;if(t<o-1)break;if(e<=l+1&&t>=o-1){r=n;break}}if(r===R)return{startIx:R,endIx:R,insertIx:a};for(var n=r;n<this._fileData.length;n++){var o=this._fileData[n].offset,l=o+this._fileData[n].data.length;if(t>=o-1&&(i=n),t<=l+1)break}return i===R&&(i=r),{startIx:r,endIx:i}}hasDataRange(e,t){for(var r=0;r<this._fileData.length;r++){var i=this._fileData[r];if(t<i.offset)return!1;if(e>=i.offset&&t<i.offset+i.data.length)return!0}return!1}getByteAt(e){for(var t,r=0;r<this._fileData.length;r++){var i=this._fileData[r].offset,a=i+this._fileData[r].data.length-1;if(e>=i&&e<=a){t=this._fileData[r];break}}if(t)return t.data[e-t.offset];throw new Error("Offset "+e+" hasn't been loaded yet.")}};var P=$;const m=G,j=P,V=B;let Y=class extends V{constructor(e){super(),this._path=e,this._fileData=new j}static canReadFile(e){return typeof e=="string"&&!/^[a-z]+:\/\//i.test(e)}getByteAt(e){return this._fileData.getByteAt(e)}_init(e){var t=this;m.stat(t._path,function(r,i){r?e.onError&&e.onError({type:"fs",fs:r}):(t._size=i.size,e.onSuccess())})}loadRange(e,t){var r=-1,i=this._fileData,a=e[1]-e[0]+1,n=t.onSuccess,o=t.onError||function(){};if(i.hasDataRange(e[0],e[1])){process.nextTick(n);return}var l=function(u,d){if(u){o({type:"fs",fs:u});return}r=d;var f=new Buffer(a);m.read(d,f,0,a,e[0],g)},g=function(u,d,f){if(m.close(r,function(v){v&&console.error(v)}),u){o({type:"fs",fs:u});return}c(f),n()},c=function(u){var d=Array.prototype.slice.call(u,0,a);i.addData(e[0],d)};m.open(this._path,"r",void 0,l)}};var q=Y,E,I;function K(){return I||(I=1,E=XMLHttpRequest),E}const J=P,Q=B,M=1024;let Z=class extends Q{constructor(e){super(),this._url=e,this._fileData=new J}static canReadFile(e){return typeof e=="string"&&/^[a-z]+:\/\//i.test(e)}_init(e){var t=this;this._makeXHRRequest("HEAD",null,{onSuccess:function(r){t._size=parseInt(r.getResponseHeader("Content-Length"),10),e.onSuccess()},onError:e.onError})}loadRange(e,t){var r=this;if(r._fileData.hasDataRange(e[0],e[1])){setTimeout(t.onSuccess,1);return}e=this._roundRangeToChunkMultiple(e),this._makeXHRRequest("GET",e,{onSuccess:function(i){var a=i.responseBody||i.responseText;r._fileData.addData(e[0],a),t.onSuccess()},onError:t.onError})}_roundRangeToChunkMultiple(e){var t=e[1]-e[0]+1,r=Math.ceil(t/M)*M;return[e[0],e[0]+r-1]}_makeXHRRequest(e,t,r){var i=this._createXHRObject(),a=function(){i.status===200||i.status===206?r.onSuccess(i):r.onError&&r.onError({type:"xhr",xhr:i}),i=null};typeof i.onload<"u"?(i.onload=a,i.onerror=function(){r.onError&&r.onError({type:"xhr",xhr:i})}):i.onreadystatechange=function(){i.readyState===4&&a()},i.open(e,this._url),i.overrideMimeType("text/plain; charset=x-user-defined"),t&&i.setRequestHeader("Range","bytes="+t[0]+"-"+t[1]),i.setRequestHeader("If-Modified-Since","Sat, 01 Jan 1970 00:00:00 GMT"),i.send(null)}getByteAt(e){var t=this._fileData.getByteAt(e);return t.charCodeAt(0)&255}_createXHRObject(){if(typeof window>"u")return new(K()).XMLHttpRequest;if(window.XMLHttpRequest)return new window.XMLHttpRequest;throw new Error("XMLHttpRequest is not supported")}};var ee=Z;const te=P,re=B;let ie=class extends re{constructor(e){super(),this._blob=e,this._fileData=new te}static canReadFile(e){return typeof Blob<"u"&&e instanceof Blob}_init(e){this._size=this._blob.size,setTimeout(e.onSuccess,1)}loadRange(e,t){var r=this,i=this._blob.slice||this._blob.mozSlice||this._blob.webkitSlice,a=i.call(this._blob,e[0],e[1]+1),n=new FileReader;n.onloadend=function(o){var l=new Uint8Array(n.result);r._fileData.addData(e[0],l),t.onSuccess()},n.onerror=n.onabort=function(o){t.onError&&t.onError({type:"blob",blob:n.error})},n.readAsArrayBuffer(a)}getByteAt(e){return this._fileData.getByteAt(e)}};var ae=ie;let ne=class{constructor(e){this._mediaFileReader=e,this._tags=null}static getTagIdentifierByteRange(){throw new Error("Must implement")}static canReadTagFormat(e){throw new Error("Must implement")}setTags(e){return this._tags=e,this}read(e){var t=this;this._mediaFileReader.init({onSuccess:function(){t._loadData(t._mediaFileReader,{onSuccess:function(){var r=t._parseData(t._mediaFileReader,t._tags);e.onSuccess(r)},onError:e.onError})},onError:e.onError})}_loadData(e,t){throw new Error("Must implement _loadData function")}_parseData(e,t){throw new Error("Must implement _parseData function")}};var w=ne,oe=w;let se=class extends oe{static getTagIdentifierByteRange(){return{offset:-128,length:128}}static canReadTagFormat(e){var t=String.fromCharCode.apply(String,e.slice(0,3));return t==="TAG"}_loadData(e,t){var r=e.getSize();e.loadRange([r-128,r-1],t)}_parseData(e,t){var r=e.getSize()-128,i=e.getStringWithCharsetAt(r+3,30).toString(),a=e.getStringWithCharsetAt(r+33,30).toString(),n=e.getStringWithCharsetAt(r+63,30).toString(),o=e.getStringWithCharsetAt(r+93,4).toString(),l=e.getByteAt(r+97+28),g=e.getByteAt(r+97+29);if(l==0&&g!=0)var c="1.1",u=e.getStringWithCharsetAt(r+97,28).toString();else{var c="1.0",u=e.getStringWithCharsetAt(r+97,30).toString();g=0}var d=e.getByteAt(r+97+30);if(d<255)var f=le[d];else var f="";var v={version:c,title:i,artist:a,album:n,year:o,comment:u,genre:f};return g&&(v.track=g),v}};var le=["Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge","Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B","Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska","Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient","Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical","Instrumental","Acid","House","Game","Sound Clip","Gospel","Noise","AlternRock","Bass","Soul","Punk","Space","Meditative","Instrumental Pop","Instrumental Rock","Ethnic","Gothic","Darkwave","Techno-Industrial","Electronic","Pop-Folk","Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta","Top 40","Christian Rap","Pop/Funk","Jungle","Native American","Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer","Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro","Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock","National Folk","Swing","Fast Fusion","Bebob","Latin","Revival","Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock","Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band","Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson","Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus","Porn Groove","Satire","Slow Jam","Club","Tango","Samba","Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle","Duet","Punk Rock","Drum Solo","Acapella","Euro-House","Dance Hall"],ge=se,ce={getFrameReaderFunction:function(s){return s in h?h[s]:s[0]==="T"?h["T*"]:null}},h={};h.APIC=function(e,t,r,i,a){a=a||"3";var n=e,o=_(r.getByteAt(e));switch(a){case"2":var l=r.getStringAt(e+1,3);e+=4;break;case"3":case"4":var l=r.getStringWithCharsetAt(e+1,t-(e-n));e+=1+l.bytesReadCount;break}var g=r.getByteAt(e,1),c=ue[g],u=r.getStringWithCharsetAt(e+1,t-(e-n),o);return e+=1+u.bytesReadCount,{format:l.toString(),type:c,description:u.toString(),data:r.getBytesAt(e,n+t-e)}};h.COMM=function(e,t,r,i,a){var n=e,o=_(r.getByteAt(e)),l=r.getStringAt(e+1,3),g=r.getStringWithCharsetAt(e+4,t-4,o);e+=4+g.bytesReadCount;var c=r.getStringWithCharsetAt(e,n+t-e,o);return{language:l,short_description:g.toString(),text:c.toString()}};h.COM=h.COMM;h.PIC=function(s,e,t,r,i){return h.APIC(s,e,t,r,"2")};h.PCNT=function(e,t,r,i,a){return r.getLongAt(e,!1)};h.CNT=h.PCNT;h["T*"]=function(e,t,r,i,a){var n=_(r.getByteAt(e));return r.getStringWithCharsetAt(e+1,t-1,n).toString()};h.TCON=function(e,t,r,i){var a=h["T*"].apply(this,arguments);return a.replace(/^\(\d+\)/,"")};h.TCO=h.TCON;h.USLT=function(e,t,r,i,a){var n=e,o=_(r.getByteAt(e)),l=r.getStringAt(e+1,3),g=r.getStringWithCharsetAt(e+4,t-4,o);e+=4+g.bytesReadCount;var c=r.getStringWithCharsetAt(e,n+t-e,o);return{language:l,descriptor:g.toString(),lyrics:c.toString()}};h.ULT=h.USLT;function _(s){var e;switch(s){case 0:e="iso-8859-1";break;case 1:e="utf-16";break;case 2:e="utf-16be";break;case 3:e="utf-8";break}return e}var ue=["Other","32x32 pixels 'file icon' (PNG only)","Other file icon","Cover (front)","Cover (back)","Leaflet page","Media (e.g. label side of CD)","Lead artist/lead performer/soloist","Artist/performer","Conductor","Band/Orchestra","Composer","Lyricist/text writer","Recording Location","During recording","During performance","Movie/video screen capture","A bright coloured fish","Illustration","Band/artist logotype","Publisher/Studio logotype"],de=ce,he=w,fe=de;let ve=class extends he{static getTagIdentifierByteRange(){return{offset:0,length:10}}static canReadTagFormat(e){var t=String.fromCharCode.apply(String,e.slice(0,3));return t==="ID3"}_loadData(e,t){e.loadRange([6,9],{onSuccess:function(){e.loadRange([0,e.getSynchsafeInteger32At(6)],t)},onError:t.onError})}_parseData(e,t){var r=0,i=e.getByteAt(r+3);if(i>4)return{version:">2.4"};var a=e.getByteAt(r+4),n=e.isBitSetAt(r+5,7),o=e.isBitSetAt(r+5,6),l=e.isBitSetAt(r+5,5),g=e.getSynchsafeInteger32At(r+6);if(r+=10,o){var c=e.getLongAt(r,!0);r+=c+4}var u={version:"2."+i+"."+a,major:i,revision:a,flags:{unsynchronisation:n,extended_header:o,experimental_indicator:l,footer_present:!1},size:g,tags:{}};if(n)var d={};else var d=this._readFrames(r,g-10,e,u,t);for(var f in A)if(A.hasOwnProperty(f)){var v=this._getFrameData(d,A[f]);v&&(u.tags[f]=v)}for(var S in d)d.hasOwnProperty(S)&&(u.tags[S]=d[S]);return u}_readFrames(e,t,r,i,a){var n={};for(a&&(a=this._expandShortcutTags(a));e<t;){var o=this._readFrameHeader(r,e,i),l=o.id;if(o.size===0||!l)break;var g=o.flags,c=o.size,u=e+o.headerSize;if(e+=o.headerSize+o.size,!(a&&a.indexOf(l)===-1)&&!(g&&g.format.unsynchronisation)){g&&g.format.data_length_indicator&&(u+=4,c-=4);var d=fe.getFrameReaderFunction(l),f=d?d(u,c,r,g):null,v=this._getFrameDescription(l),S={id:l,size:c,description:v,data:f};l in n?(n[l].id&&(n[l]=[n[l]]),n[l].push(S)):n[l]=S}}return n}_readFrameHeader(e,t,r){var i=r.major,a=null;switch(i){case 2:var n=e.getStringAt(t,3),o=e.getInteger24At(t+3,!0),l=6;break;case 3:var n=e.getStringAt(t,4),o=e.getLongAt(t+4,!0),l=10;break;case 4:var n=e.getStringAt(t,4),o=e.getSynchsafeInteger32At(t+4),l=10;break}return n&&i>2&&(a=this._readFrameFlags(e,t+8)),{id:n,size:o,headerSize:l,flags:a}}_readFrameFlags(e,t){return{message:{tag_alter_preservation:e.isBitSetAt(t,6),file_alter_preservation:e.isBitSetAt(t,5),read_only:e.isBitSetAt(t,4)},format:{grouping_identity:e.isBitSetAt(t+1,7),compression:e.isBitSetAt(t+1,3),encryption:e.isBitSetAt(t+1,2),unsynchronisation:e.isBitSetAt(t+1,1),data_length_indicator:e.isBitSetAt(t+1,0)}}}_getFrameData(e,t){for(var r=0,i;i=t[r];r++)if(i in e)return e[i].data}_getFrameDescription(e){return e in O?O[e]:"Unknown"}_expandShortcutTags(e){for(var t=[],r=0,i;i=e[r];r++)t=t.concat(A[i]||[i]);return t}};const O={BUF:"Recommended buffer size",CNT:"Play counter",COM:"Comments",CRA:"Audio encryption",CRM:"Encrypted meta frame",ETC:"Event timing codes",EQU:"Equalization",GEO:"General encapsulated object",IPL:"Involved people list",LNK:"Linked information",MCI:"Music CD Identifier",MLL:"MPEG location lookup table",PIC:"Attached picture",POP:"Popularimeter",REV:"Reverb",RVA:"Relative volume adjustment",SLT:"Synchronized lyric/text",STC:"Synced tempo codes",TAL:"Album/Movie/Show title",TBP:"BPM (Beats Per Minute)",TCM:"Composer",TCO:"Content type",TCR:"Copyright message",TDA:"Date",TDY:"Playlist delay",TEN:"Encoded by",TFT:"File type",TIM:"Time",TKE:"Initial key",TLA:"Language(s)",TLE:"Length",TMT:"Media type",TOA:"Original artist(s)/performer(s)",TOF:"Original filename",TOL:"Original Lyricist(s)/text writer(s)",TOR:"Original release year",TOT:"Original album/Movie/Show title",TP1:"Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",TP2:"Band/Orchestra/Accompaniment",TP3:"Conductor/Performer refinement",TP4:"Interpreted, remixed, or otherwise modified by",TPA:"Part of a set",TPB:"Publisher",TRC:"ISRC (International Standard Recording Code)",TRD:"Recording dates",TRK:"Track number/Position in set",TSI:"Size",TSS:"Software/hardware and settings used for encoding",TT1:"Content group description",TT2:"Title/Songname/Content description",TT3:"Subtitle/Description refinement",TXT:"Lyricist/text writer",TXX:"User defined text information frame",TYE:"Year",UFI:"Unique file identifier",ULT:"Unsychronized lyric/text transcription",WAF:"Official audio file webpage",WAR:"Official artist/performer webpage",WAS:"Official audio source webpage",WCM:"Commercial information",WCP:"Copyright/Legal information",WPB:"Publishers official webpage",WXX:"User defined URL link frame",AENC:"Audio encryption",APIC:"Attached picture",ASPI:"Audio seek point index",COMM:"Comments",COMR:"Commercial frame",ENCR:"Encryption method registration",EQU2:"Equalisation (2)",EQUA:"Equalization",ETCO:"Event timing codes",GEOB:"General encapsulated object",GRID:"Group identification registration",IPLS:"Involved people list",LINK:"Linked information",MCDI:"Music CD identifier",MLLT:"MPEG location lookup table",OWNE:"Ownership frame",PRIV:"Private frame",PCNT:"Play counter",POPM:"Popularimeter",POSS:"Position synchronisation frame",RBUF:"Recommended buffer size",RVA2:"Relative volume adjustment (2)",RVAD:"Relative volume adjustment",RVRB:"Reverb",SEEK:"Seek frame",SYLT:"Synchronized lyric/text",SYTC:"Synchronized tempo codes",TALB:"Album/Movie/Show title",TBPM:"BPM (beats per minute)",TCOM:"Composer",TCON:"Content type",TCOP:"Copyright message",TDAT:"Date",TDLY:"Playlist delay",TDRC:"Recording time",TDRL:"Release time",TDTG:"Tagging time",TENC:"Encoded by",TEXT:"Lyricist/Text writer",TFLT:"File type",TIME:"Time",TIPL:"Involved people list",TIT1:"Content group description",TIT2:"Title/songname/content description",TIT3:"Subtitle/Description refinement",TKEY:"Initial key",TLAN:"Language(s)",TLEN:"Length",TMCL:"Musician credits list",TMED:"Media type",TMOO:"Mood",TOAL:"Original album/movie/show title",TOFN:"Original filename",TOLY:"Original lyricist(s)/text writer(s)",TOPE:"Original artist(s)/performer(s)",TORY:"Original release year",TOWN:"File owner/licensee",TPE1:"Lead performer(s)/Soloist(s)",TPE2:"Band/orchestra/accompaniment",TPE3:"Conductor/performer refinement",TPE4:"Interpreted, remixed, or otherwise modified by",TPOS:"Part of a set",TPRO:"Produced notice",TPUB:"Publisher",TRCK:"Track number/Position in set",TRDA:"Recording dates",TRSN:"Internet radio station name",TRSO:"Internet radio station owner",TSOA:"Album sort order",TSOP:"Performer sort order",TSOT:"Title sort order",TSIZ:"Size",TSRC:"ISRC (international standard recording code)",TSSE:"Software/Hardware and settings used for encoding",TSST:"Set subtitle",TYER:"Year",TXXX:"User defined text information frame",UFID:"Unique file identifier",USER:"Terms of use",USLT:"Unsychronized lyric/text transcription",WCOM:"Commercial information",WCOP:"Copyright/Legal information",WOAF:"Official audio file webpage",WOAR:"Official artist/performer webpage",WOAS:"Official audio source webpage",WORS:"Official internet radio station homepage",WPAY:"Payment",WPUB:"Publishers official webpage",WXXX:"User defined URL link frame"},A={title:["TIT2","TT2"],artist:["TPE1","TP1"],album:["TALB","TAL"],year:["TYER","TYE"],comment:["COMM","COM"],track:["TRCK","TRK"],genre:["TCON","TCO"],picture:["APIC","PIC"],lyrics:["USLT","ULT"]};var Te=ve,Se=w;let Re=class extends Se{static getTagIdentifierByteRange(){return{offset:0,length:11}}static canReadTagFormat(e){var t=String.fromCharCode.apply(String,e.slice(4,11));return t==="ftypM4A"}_loadData(e,t){var r=this;e.loadRange([0,7],{onSuccess:function(){r._loadAtom(e,0,"",t)},onError:t.onError})}_loadAtom(e,t,r,i){if(t>=e.getSize()){i.onSuccess();return}var a=this,n=e.getLongAt(t,!0);if(n==0||isNaN(n)){i.onSuccess();return}var o=e.getStringAt(t+4,4);if(this._isContainerAtom(o)){o=="meta"&&(t+=4);var l=(r?r+".":"")+o;l==="moov.udta.meta.ilst"?e.loadRange([t,t+n],i):e.loadRange([t+8,t+8+8],{onSuccess:function(){a._loadAtom(e,t+8,l,i)},onError:i.onError})}else e.loadRange([t+n,t+n+8],{onSuccess:function(){a._loadAtom(e,t+n,r,i)},onError:i.onError})}_isContainerAtom(e){return["moov","udta","meta","ilst"].indexOf(e)>=0}_canReadAtom(e){return e!=="----"}_parseData(e,t){var r={};this._readAtom(r,e,0,e.getSize());for(var i in D)if(D.hasOwnProperty(i)){var a=r[D[i]];a&&(i==="track"?r[i]=a.data.track:r[i]=a.data)}return{tags:r}}_readAtom(e,t,r,i,a,n){n=n===void 0?"":n+"  ";for(var o=r;o<r+i;){var l=t.getLongAt(o,!0);if(l==0)return;var g=t.getStringAt(o+4,4);if(this._isContainerAtom(g)){g=="meta"&&(o+=4);var c=(a?a+".":"")+g;this._readAtom(e,t,o+8,l-8,c,n);return}if(a==="moov.udta.meta.ilst"&&this._canReadAtom(g)){var u=t.getInteger24At(o+16+1,!0),d=pe[u];if(g=="trkn")p={track:t.getByteAt(o+16+11),total:t.getByteAt(o+16+13)};else{var f=24,v=o+f,S=l-f,p;switch(d){case"text":p=t.getStringWithCharsetAt(v,S,"utf-8").toString();break;case"uint8":p=t.getShortAt(v,!1);break;case"jpeg":case"png":p={format:"image/"+d,data:t.getBytesAt(v,S)};break}}e[g]={id:g,size:l,description:me[g]||"Unknown",data:p}}o+=l}}};const pe={0:"uint8",1:"text",13:"jpeg",14:"png",21:"uint8"},me={"©alb":"Album","©ART":"Artist",aART:"Album Artist","©day":"Release Date","©nam":"Title","©gen":"Genre",gnre:"Genre",trkn:"Track Number","©wrt":"Composer","©too":"Encoding Tool","©enc":"Encoded By",cprt:"Copyright",covr:"Cover Art","©grp":"Grouping",keyw:"Keywords","©lyr":"Lyrics","©cmt":"Comment",tmpo:"Tempo",cpil:"Compilation",disk:"Disc Number",tvsh:"TV Show Name",tven:"TV Episode ID",tvsn:"TV Season",tves:"TV Episode",tvnn:"TV Network",desc:"Description",ldes:"Long Description",sonm:"Sort Name",soar:"Sort Artist",soaa:"Sort Album",soco:"Sort Composer",sosn:"Sort Show",purd:"Purchase Date",pcst:"Podcast",purl:"Podcast URL",catg:"Category",hdvd:"HD Video",stik:"Media Type",rtng:"Content Rating",pgap:"Gapless Playback",apID:"Purchase Account",sfID:"Country Code"},D={title:"©nam",artist:"©ART",album:"©alb",year:"©day",comment:"©cmt",track:"trkn",genre:"©gen",picture:"covr",lyrics:"©lyr"};var Ae=Re;const Ce=q,_e=ee,ye=ae,Fe=ge,Ee=Te,De=Ae;var C=[],T=[];function Be(s,e){new L(s).read(e)}class L{constructor(e){this._file=e}setTags(e){return this._tags=e,this}setFileReader(e){return this._fileReader=e,this}setTagReader(e){return this._tagReader=e,this}read(e){var t=this._getFileReader(),r=new t(this._file),i=this;r.init({onSuccess:function(){i._getTagReader(r,{onSuccess:function(a){new a(r).setTags(i._tags).read(e)},onError:e.onError})},onError:e.onError})}_getFileReader(){return this._fileReader?this._fileReader:this._findFileReader()}_findFileReader(){for(var e=0;e<C.length;e++)if(C[e].canReadFile(this._file))return C[e];throw new Error("No suitable file reader found for ",this._file)}_getTagReader(e,t){if(this._tagReader){var r=this._tagReader;setTimeout(function(){t.onSuccess(r)},1)}else this._findTagReader(e,t)}_findTagReader(e,t){for(var r=[],i=[],a=e.getSize(),n=0;n<T.length;n++){var o=T[n].getTagIdentifierByteRange();o.offset>=0&&o.offset<a/2||o.offset<0&&o.offset<-a/2?r.push(T[n]):i.push(T[n])}var l=!1,g={onSuccess:function(){if(!l){l=!0;return}for(var c=0;c<T.length;c++){var u=T[c].getTagIdentifierByteRange(),d=e.getBytesAt(u.offset>=0?u.offset:u.offset+a,u.length);if(T[c].canReadTagFormat(d)){t.onSuccess(T[c]);return}}t.onError&&t.onError({type:"tagFormat",tagFormat:"No suitable tag reader found"})},onError:t.onError};this._loadTagIdentifierRanges(e,r,g),this._loadTagIdentifierRanges(e,i,g)}_loadTagIdentifierRanges(e,t,r){if(t.length===0){setTimeout(r.onSuccess,1);return}for(var i=[Number.MAX_VALUE,0],a=e.getSize(),n=0;n<t.length;n++){var o=t[n].getTagIdentifierByteRange(),l=o.offset>=0?o.offset:o.offset+a,g=l+o.length-1;i[0]=Math.min(l,i[0]),i[1]=Math.max(g,i[1])}e.loadRange(i,r)}}class x{static addFileReader(e){return C.push(e),this}static addTagReader(e){return T.push(e),this}static removeTagReader(e){var t=T.indexOf(e);return t>=0&&T.splice(t,1),this}}x.addFileReader(_e).addFileReader(ye).addTagReader(Ee).addTagReader(Fe).addTagReader(De);typeof process<"u"&&x.addFileReader(Ce);var Pe={read:Be,Reader:L,Config:x};const we=k(Pe);chrome.runtime.onMessage.addListener(async s=>{if(console.log("request: ",s),s.type==="FetchingMediaSource"){const e=await(await fetch(s.src)).blob();we.read(e,{onSuccess:function({tags:{title:t,artist:r}}){z.send({type:"SendAudioProfile",filename:t&&r?`${r} - ${t}`:"audio",sourceURL:s.src})}})}s.type==="PushCurrentPageURL"&&console.log("data: ",s)});