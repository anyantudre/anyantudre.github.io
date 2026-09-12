/* THE ONLY SCRIPT the redesign adds. One IIFE: the copy button, and the
   scroll-spy that feeds both networks — the hero MLP and the mini-MLP in the
   bar — plus the outline highlight on the post. No library, and no scroll
   handler: an IntersectionObserver marks the section in view, and the
   CONTRIBUTION FIELD drawn for it is a pure function of its index, so a
   section always draws the same field rather than re-randomising on every
   frame. Hovering or focusing an output unit overrides the spy for as long as
   it lasts; letting go falls back to the section in view. With JS off none of
   this is needed: the markup already carries a graded field with the first
   unit lit, the copy button stays hidden, and no outline item is marked —
   never a wrong one, never a blank box. Transitions are colour and opacity
   only, and CSS suppresses even those under prefers-reduced-motion.

   ONE line differs from the design file, marked JEKYLL below: the mock-up held
   all six views in a single document and switched between them with
   [data-page], so the spy scoped itself to the visible one. Here each view is
   its own route, so it falls back to #main — the same element, reached the way
   a real site reaches it.

   ONE STEP IS ADDED, marked INTEGRATION: step 0, the Markdown pass. The design
   hand-wrote its headings, its outline and its one listing; a real post and a
   real project page arrive as kramdown output instead, so those three pieces
   of furniture have to be hung on the rendered body. It lives here, once, and
   runs over every [data-prose] body on the page — rather than in two inline
   <script> blocks in two layouts, which is where the port first put it. */
(function(){
 var d=document,root=d.documentElement;

 /* THE UI STRINGS, IN THE PAGE'S OWN LANGUAGE.

    Everything this script writes into the document used to be an English
    literal — "Copy", "Copied", "Copy failed", and the two aria-labels — and
    this script runs over every [data-prose] body, which includes the French
    posts and the French project pages. _data/t.yml carries them now; the shell
    serialises its `js:` block into #ui-strings and this reads it once.

    The English fallbacks stay as the last resort: if the JSON is missing or
    malformed the buttons must still be labelled, never blank. */
 var T={copy:"Copy",copied:"Copied",copy_failed:"Copy failed",
        copy_aria:"Copy the code listing to the clipboard",
        copied_aria:"Code copied to the clipboard",
        scroll_region:"Scrollable region"};
 try{
  var tn=d.getElementById("ui-strings");
  if(tn&&tn.textContent){
   var tj=JSON.parse(tn.textContent);
   for(var tk in tj)if(tj[tk])T[tk]=tj[tk];
  }
 }catch(e){}

 /* === 0. INTEGRATION — THE MARKDOWN PASS ===
    Three jobs the design does in its markup and a rendered Markdown body
    cannot: the spectrogram rule under each h2, the outline built from the
    headings that are actually there, and a .codeblock wrapper round each
    listing so the copy button below has something to bind to. Every one is
    progressive enhancement: with JS off there are no bands, no outline and no
    copy button — never a broken band, never an empty outline box, never a
    dead control.

    The scope is [data-prose], which _layouts/blog_post.html puts on the
    post's .postcontent and _layouts/redesign-project.html on the project's
    article. The outline is built only where the layout has provided a
    .tocwrap for it, so the project page gets rules and listings and no
    outline, which is what it wants.

    .legacy — the kept routes and the talk/teaching detail pages — is listed
    too, but for the LISTINGS ONLY (0c): those pages were decided to get the
    new palette, measures and furniture and no bespoke design, so they take
    the copy button and the un-carded listing and no spectrogram bands. The
    matching CSS in _sass/redesign/_post.scss carries the same two scopes. */
 (function(){
  var bodies=d.querySelectorAll("[data-prose],.legacy"),SG=["sg3","sg6","sg4","sg1","sg2","sg5"];
  for(var s=0;s<bodies.length;s++){
   var scope=bodies[s],
       full=scope.hasAttribute("data-prose"),
       hs=[].slice.call(scope.querySelectorAll("h2,h3")),i;

   if(full){
    /* 0a. THE RULE UNDER EVERY h2, cycling the six envelopes so no two
       adjacent sections carry the same band. */
    for(var r=0,j=0;j<hs.length;j++){
     if(hs[j].tagName!=="H2")continue;
     var rule=d.createElement("div");
     rule.className="rule";rule.setAttribute("aria-hidden","true");
     rule.innerHTML='<svg><use href="#'+SG[r%SG.length]+'"></use></svg>';r++;
     hs[j].parentNode.insertBefore(rule,hs[j].nextSibling);
    }

    /* 0b. THE OUTLINE. kramdown gives every heading an id already; the
       fallback is only for one that somehow has none. The wrapper stays
       hidden until at least one entry exists, so an outline is never an
       empty box. Only a layout that provided a .tocwrap gets one. */
    var wrap=d.querySelector(".tocwrap"),ol=wrap?wrap.querySelector(".toc ol"):null,n=0;
    if(ol&&!ol.children.length){
     for(i=0;i<hs.length;i++){
      var h=hs[i];
      if(!h.id){h.id=h.textContent.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-");}
      var li=d.createElement("li");
      if(h.tagName==="H3")li.className="sub";
      var a=d.createElement("a");
      a.href="#"+h.id;a.textContent=h.textContent;
      li.appendChild(a);ol.appendChild(li);n++;
     }
     if(n)wrap.removeAttribute("hidden");
    }
   }

   /* 0c. THE LISTINGS — on EVERY prose body, legacy included. Rouge runs with
      line numbers, so one listing is
          pre.highlight > code > table
              > td.rouge-gutter > pre.lineno
              > td.rouge-code   > pre
      three <pre> elements, only the last of which is the code. Take the
      OUTERMOST pre (the one with no <pre> above it), climb past the highlight
      wrappers, and wrap THAT in the design's .codeblock.

      The button goes inside td.rouge-code, not beside the block: what step 1
      copies is b.parentNode.querySelector("pre"), and from there that is the
      code cell's own <pre> — the line numbers never reach the clipboard. It
      still paints top-right, because .copy is absolute and the nearest
      positioned ancestor is the listing's own box. */
   var pres=scope.querySelectorAll("pre");
   for(i=0;i<pres.length;i++){
    var node=pres[i],p=node.parentNode,nested=false;
    while(p&&p!==scope){if(p.nodeName==="PRE"){nested=true;break;}p=p.parentNode;}
    if(nested)continue;
    while((p=node.parentNode)&&p!==scope&&p.nodeName==="DIV"&&/highlight/.test(p.className||"")){node=p;}
    if(!node.parentNode||/codeblock/.test(node.parentNode.className||""))continue;
    var box=d.createElement("div");
    box.className="codeblock";
    node.parentNode.insertBefore(box,node);
    box.appendChild(node);
    var btn=d.createElement("button");
    btn.className="copy";btn.type="button";btn.hidden=true;
    btn.setAttribute("aria-label",T.copy_aria);
    btn.textContent=T.copy;
    (box.querySelector("td.rouge-code")||box).appendChild(btn);
   }
  }
 })();

 /* 0d. A BOX THAT SCROLLS HAS TO BE REACHABLE FROM A KEYBOARD.

    Six rule sets in the stylesheet create horizontally scrolling boxes: `pre`,
    `pre.highlight`, `td.rouge-code pre`, `.chartwrap` (which wraps a .chart
    with a 26rem min-width, so it WILL overflow at 375px by construction),
    `.eqn` (white-space:nowrap) and `.colo-m`. None of them contained anything
    focusable, and none carried a tabindex — so a keyboard-only reader, and
    every switch-access user, simply could not see the right-hand part of a
    code listing, a chart or a long equation. One post alone has 38 <pre>
    elements. It is axe's `scrollable-region-focusable`, WCAG 2.1.1 Level A,
    and on a phone it is the normal case rather than an edge case.

    THE OVERFLOW TEST IS THE GATE, deliberately. Making every listing a tab
    stop would add dozens of stops to a long tutorial for no gain; only a box
    that actually overflows AT THE CURRENT WIDTH becomes one. Which means the
    test has to run again on resize, or a stop appears or disappears silently
    as the window changes — hence the debounced re-run, which also clears the
    attributes again when a box stops overflowing.

    role="region" + an accessible name is what makes the stop announce itself
    as something rather than as an anonymous focusable div; the name comes from
    _data/t.yml, so it is French on a French page. */
 (function(){
  var SEL="pre, .chartwrap, .eqn, .colo-m",pending;
  function mark(){
   var xs=d.querySelectorAll(SEL),i,el;
   for(i=0;i<xs.length;i++){
    el=xs[i];
    /* An inner <pre> whose scrolling ancestor is already a stop would double
       up; the code cell's own pre is the one that scrolls, so skip a pre that
       contains the rouge table rather than the code. */
    if(el.nodeName==="PRE"&&el.querySelector("table.rouge-table"))continue;
    if(el.scrollWidth>el.clientWidth+1){
     if(el.getAttribute("data-scrollable"))continue;
     el.setAttribute("data-scrollable","");
     el.setAttribute("tabindex","0");
     el.setAttribute("role","region");
     el.setAttribute("aria-label",T.scroll_region);
    }else if(el.hasAttribute("data-scrollable")){
     el.removeAttribute("data-scrollable");
     el.removeAttribute("tabindex");
     el.removeAttribute("role");
     el.removeAttribute("aria-label");
    }
   }
  }
  mark();
  window.addEventListener("resize",function(){
   clearTimeout(pending);pending=setTimeout(mark,200);
  });
 })();

 /* 0. OFF-SITE LINKS OPEN IN A NEW TAB.

    Done here rather than in the includes for two reasons: the links are spread
    across the masthead, the profile column, the award rows, the project rows,
    the footer and the post tail, and — more importantly — the ones inside a
    post's body come from Kramdown rendering his Markdown, where no Liquid can
    reach them. One rule catches every case.

    "Off-site" is decided by comparing the resolved host to this one, so a
    root-relative link, an in-page #anchor and an absolute link that happens to
    point back at the site are all left alone. mailto:, tel: and the like have
    no host and are skipped: they hand off to another application already, and
    opening a blank tab for them leaves a dead window behind.

    rel="noopener noreferrer" goes on with it. Without noopener the opened page
    can reach back through window.opener and navigate this one; it is the one
    genuine security cost of target="_blank".

    A reader without JavaScript simply gets same-tab navigation — the link
    still works, which is why this does not need to be in the markup.

    One pass at load is not quite enough: the mapmyvisitors widget injects its
    own link asynchronously, so it arrives after the pass has run. A debounced
    MutationObserver re-runs the sweep for late arrivals and then gives up
    after fifteen seconds — long enough for any third-party embed, short enough
    that nothing is left watching the document for the life of the page. */
 (function(){
  var here=location.host;
  function sweep(){
   var as=d.getElementsByTagName("a");
   for(var i=0;i<as.length;i++){
    var a=as[i];
    if(!a.host||a.host===here)continue;
    if(!/^https?:$/.test(a.protocol))continue;
    /* An existing target is normally an author's deliberate choice and is left
       alone — except _self, _top and _parent, which on an OFF-SITE link all
       mean "navigate away from the site in this tab", i.e. the exact behaviour
       being fixed. The mapmyvisitors badge ships target="_top". A named frame
       target, or an already-correct _blank, is respected. */
    var tg=a.getAttribute("target");
    if(tg&&!/^_(self|top|parent)$/.test(tg))continue;
    a.setAttribute("target","_blank");
    a.setAttribute("rel",(a.getAttribute("rel")?a.getAttribute("rel")+" ":"")+"noopener noreferrer");
   }
  }
  sweep();
  if(!window.MutationObserver)return;
  var pending,mo=new MutationObserver(function(){
   clearTimeout(pending);pending=setTimeout(sweep,150);
  });
  mo.observe(d.body,{childList:true,subtree:true});
  setTimeout(function(){clearTimeout(pending);sweep();mo.disconnect();},15000);
 })();

 /* 1. THE COPY BUTTON — only if the clipboard API is genuinely there, so
    there is never a dead control. */
 if(navigator.clipboard&&navigator.clipboard.writeText){
  var bs=d.querySelectorAll(".codeblock .copy");
  for(var i=0;i<bs.length;i++)(function(b){
   var pre=b.parentNode.querySelector("pre"),lab=b.getAttribute("aria-label"),t;
   if(!pre)return;
   b.removeAttribute("hidden");
   function reset(){b.textContent=T.copy;b.removeAttribute("data-copied");b.setAttribute("aria-label",lab);}
   b.addEventListener("click",function(){
    navigator.clipboard.writeText(pre.textContent).then(function(){
     b.textContent=T.copied;b.setAttribute("data-copied","");
     b.setAttribute("aria-label",T.copied_aria);
     clearTimeout(t);t=setTimeout(reset,1500);
    },function(){
     b.textContent=T.copy_failed;clearTimeout(t);t=setTimeout(reset,1500);
    });
   });
  })(bs[i]);
 }

 /* === 2. THE TWO NETWORKS — THE CONTRIBUTION FIELD (ROUND 6 § 5) ===

    What the design shipped was ONE polyline: input unit, hidden unit, hidden
    unit, output unit, redrawn per section. That is a wire. A network does not
    compute along a wire — every unit of every layer contributes something to
    every output, a few of them a great deal. And because the polyline was the
    only thing that moved, hovering a unit changed nothing: the picture stayed
    on whatever the scroll-spy had last said, which on a freshly loaded page is
    News.

    So: every edge and every node now carries its own weight in [0,1] for the
    ACTIVE output, written as the custom property --w, and the stylesheet
    renders that weight as accent strength — deep oxblood at the top of the
    ramp, pale at the bottom, never zero. The markup already ships one such
    field baked in for output 0, so a reader with no JavaScript sees the same
    instrument, still.

    THE FIELD IS COMPUTED BACKWARDS FROM THE ACTIVE OUTPUT, which is what
    makes it read as a computation rather than as noise:

      relevance of the output layer   1 for the active unit, 0.06 for the rest
      every edge into a unit          that unit's relevance x the edge's own
                                      conductance
      relevance of a unit             0.16 + 0.84 x its strongest onward edge

    so a unit wired strongly into a strongly-relevant unit is itself strongly
    relevant, the effect fades layer by layer back towards the inputs, and
    everything lands in [0,1] with no normalisation pass. Choosing the MAX
    onward edge rather than the sum is what keeps the range bounded and what
    makes the picture a set of paths of differing strength rather than a
    uniform wash.

    DETERMINISTIC, AND NO Math.random ANYWHERE. Every conductance is a hash of
    (active output, depth from the output, source unit, target unit), computed
    with 32-bit integer xorshift only — exact in every engine — so a section
    always draws the same field and re-entering it reproduces it exactly. Each
    field is computed once and cached by topology and index. */
 var hero=d.querySelector(".mlp"),mini=d.querySelector(".minimlp");

 function hsh(){
  var x=0,i;
  for(i=0;i<arguments.length;i++){
   x=(x+arguments[i]+1)|0;
   x^=x<<13;x|=0; x^=x>>>17; x^=x<<5;x|=0;
  }
  return ((x>>>0)%100000)/100000;
 }

 var FC={};
 function field(k,sizes){
  var key=sizes.join("-")+":"+k;
  if(FC[key])return FC[key];
  var L=sizes.length,rel=[],ed=[],l,a,b,g,w,m;
  rel[L-1]=[];
  for(b=0;b<sizes[L-1];b++)rel[L-1][b]=(b===k)?1:0.06;
  for(l=L-2;l>=0;l--){
   var dep=L-1-l,na=sizes[l],nb=sizes[l+1],row=[];
   rel[l]=[];
   for(a=0;a<na;a++){
    m=0;
    for(b=0;b<nb;b++){
     g=0.14+0.86*hsh(k,dep,a,b);
     w=rel[l+1][b]*g;
     row[a*nb+b]=w;
     if(w>m)m=w;
    }
    rel[l][a]=0.16+0.84*m;
   }
   ed[l]=row;
  }
  FC[key]={e:ed,n:rel};
  return FC[key];
 }

 /* Addressing. Each edge declares data-l (layer), data-a (source) and data-b
    (target); each node declares data-n (layer) and data-k (unit). Document
    order is therefore free — the fan of an output unit can live in the shared
    edge group while the unit's own name lives in its <a> — and reordering the
    sections cannot silently mis-wire the field. */
 function wire(svg,sizes,esel,nsel){
  if(!svg)return null;
  var e=[],n=[],l,i,el,q;
  for(l=0;l<sizes.length;l++){n[l]=[];if(l<sizes.length-1)e[l]=[];}
  q=svg.querySelectorAll(esel);
  for(i=0;i<q.length;i++){el=q[i];
   l=+el.getAttribute("data-l");
   if(e[l])e[l][(+el.getAttribute("data-a"))*sizes[l+1]+(+el.getAttribute("data-b"))]=el;}
  q=svg.querySelectorAll(nsel);
  for(i=0;i<q.length;i++){el=q[i];
   l=+el.getAttribute("data-n");
   if(n[l])n[l][+el.getAttribute("data-k")]=el;}
  return {svg:svg,sizes:sizes,e:e,n:n,k:-1,
          outs:[].slice.call(svg.querySelectorAll(".out"))};
 }

 /* The hero is 3–5–5–7 and the mark 3–5–7. Their last hidden layer and their
    output layer are the same sizes, and the hash is keyed by DEPTH FROM THE
    OUTPUT rather than by layer number, so the two agree on the relevance of
    the hidden units they share: the mark is genuinely a small view of the same
    computation, not a second unrelated drawing. */
 var heroNet=wire(hero,[3,5,5,7],".edge[data-l]",".node[data-n]"),
     miniNet=wire(mini,[3,5,7],".mm-e[data-l]",".mm-n[data-n]");

 function paint(net,k){
  if(!net||net.k===k)return;
  net.k=k;
  var f=field(k,net.sizes),l,i,row,els;
  for(l=0;l<f.e.length;l++){row=f.e[l];els=net.e[l];
   for(i=0;i<row.length;i++)if(els[i])els[i].style.setProperty("--w",row[i].toFixed(3));}
  for(l=0;l<f.n.length;l++){row=f.n[l];els=net.n[l];
   for(i=0;i<row.length;i++)if(els[i])els[i].style.setProperty("--w",row[i].toFixed(3));}
  for(i=0;i<net.outs.length;i++)net.outs[i].classList.toggle("on",i===k);
 }

 /* TWO SOURCES OF TRUTH, one picture. `spy` is the section in view; `hov` is
    the unit under the pointer or holding keyboard focus, and -1 when there is
    none. Hover wins while it lasts; releasing it falls back to the section in
    view — NOT to the first unit. Before the first heading has crossed the
    reading line there is no section in view, and 0 is both the sensible
    default and exactly what the static markup already draws. */
 var NOUT=7,spy=-1,hov=-1;
 function show(){
  var k=hov>=0?hov:(spy>=0?spy:0);
  paint(heroNet,k);paint(miniNet,k);
 }

 /* 2b. HOVER AND FOCUS, delegated so the seven units cost two listeners.
    `out` walks up from the event target because an <a> in SVG is not an
    HTMLElement and .closest() is not worth assuming. mouseout and focusout
    both consult relatedTarget: moving from one unit straight to the next must
    hand over, not blink through the scroll-spy state. Clicking is untouched —
    the unit is still a plain <a href="#section">, so it still scrolls. */
 if(heroNet&&heroNet.outs.length){
  var sv=heroNet.svg;
  var unit=function(t){
   while(t&&t!==sv){
    if(t.getAttribute&&t.getAttribute("data-i")!==null&&/(^|\s)out(\s|$)/.test(t.getAttribute("class")||""))
     return +t.getAttribute("data-i");
    t=t.parentNode;
   }
   return -1;
  };
  var enter=function(e){var i=unit(e.target);if(i>=0&&i!==hov){hov=i;show();}},
      leave=function(e){var i=unit(e.relatedTarget);if(i!==hov){hov=i;show();}};
  sv.addEventListener("mouseover",enter);
  sv.addEventListener("mouseout",leave);
  sv.addEventListener("focusin",enter);
  sv.addEventListener("focusout",leave);
 }

 /* 2c. BELOW 640px THE FIGURE IS DECORATION — "keep the drawing, list below
    it". At that width the viewBox paints at ~0.485, so the seven section names
    render at 5.98px and the rect that is their whole pointer target at
    10.97px. _includes/redesign/mlp-hero.html therefore emits the same seven
    sections a second time, from the same two Liquid arrays, as a real list of
    44px-tall links, and _sass/redesign/_devices.scss hides the seven
    <a class="out"> with visibility:hidden — which is what actually takes them
    out of the tab order and the accessibility tree, with or without this
    script.

    Two things are left that CSS cannot say, and this says them:

      aria-hidden   the <svg> still carries a <title> describing the network
                    as the page's seven sections. With the list below now
                    holding that job, the title would be a second, wordier
                    table of contents read out first. Hidden on a phone,
                    restored above 639px where the seven <a> are the real ones.

      viewBox       the box reserves x = 372.6 … 596 for the names. With the
                    names gone that is 34% of the width painted empty and the
                    network shrunk to fit around nothing, so the box is cropped
                    to 442 units — the last output disc at 368 + r 4.6, plus a
                    unit of air — and the drawing fills the column it has.

    Neither touches the field or the spy: both address .edge[data-l] and
    .node[data-n], which stay visible and keep lighting at every width. A
    reader with no JavaScript gets the cropped-viewBox benefit only after it
    loads, and the uncropped figure before — a wider-than-needed drawing, never
    a broken one. */
 if(hero&&heroNet){
  var VB_WIDE="-66 0 662 236",VB_PHONE="-66 0 442 236",
      mqp=window.matchMedia?window.matchMedia("(max-width:639px)"):null;
  var decor=function(){
   var p=mqp?mqp.matches:false,i;
   if(p)hero.setAttribute("aria-hidden","true");else hero.removeAttribute("aria-hidden");
   hero.setAttribute("viewBox",p?VB_PHONE:VB_WIDE);
   for(i=0;i<heroNet.outs.length;i++){
    if(p)heroNet.outs[i].setAttribute("tabindex","-1");
    else heroNet.outs[i].removeAttribute("tabindex");
   }
  };
  decor();
  if(mqp){
   if(mqp.addEventListener)mqp.addEventListener("change",decor);
   else if(mqp.addListener)mqp.addListener(decor);
  }
 }

 /* 3. ONE SCROLL-SPY drives all of it — the hero network, the mark in the
    bar, and the outline on the post. On home the targets are the seven
    section headings; elsewhere they are the entries that view marks with
    data-spy, plus its headings; failing both, its entries. */
 var view=root.getAttribute("data-view")||"home",
     /* JEKYLL: [data-page] only exists if markup was lifted straight from the
        design; on a real route the view IS the page, so #main is the scope. */
     page=d.querySelector('[data-page="'+view+'"]')||d.getElementById("main"),
     toc=d.querySelectorAll(".toc a");
 /* THE OUTPUT UNITS NAME THEIR OWN SECTIONS, so the spy does not have to
    count. Each unit's href is #<id>; the map inverts that, and a target whose
    id is in it lights the unit that actually points at it. The home page can
    then be reordered — ROUND 6 moved Latest posts to the end — by editing the
    section list in _includes/redesign/mlp-hero.html alone, and a stray
    h3[id] or [data-spy] in the middle of the page cannot shift every unit by
    one. Off home there is no hero and no map, and the old modulo walk stands:
    the mark still travels as the reader travels. */
 var idOf={},oi;
 if(heroNet)for(oi=0;oi<heroNet.outs.length;oi++){
  var hr=heroNet.outs[oi].getAttribute("href")||"";
  if(hr.charAt(0)==="#")idOf[hr.slice(1)]=oi;
 }
 show();

 if(!page||!("IntersectionObserver" in window))return;
 var targets=[].slice.call(page.querySelectorAll("[data-spy],h2[id],h3[id]"));
 if(!targets.length)targets=[].slice.call(page.querySelectorAll(".entry,.wrow,.cell,.list--d > li"));
 if(!targets.length)return;

 function mark(i){
  var id=targets[i].id,k;
  k=(id&&Object.prototype.hasOwnProperty.call(idOf,id))?idOf[id]:i%NOUT;
  if(k!==spy){spy=k;show();}
  for(var n=0;n<toc.length;n++)toc[n].classList.toggle("on",!!id&&toc[n].getAttribute("href")==="#"+id);
 }

 var fs=parseFloat(getComputedStyle(root).fontSize)||18,
     nav=parseFloat(getComputedStyle(root).getPropertyValue("--navh"))||6.6,
     above=[];
 /* THE NEAREST TARGET ABOVE THE FOLD. The observer root is the viewport less
    the sticky bar at the top and 55% at the bottom, so rootBounds.bottom IS
    the reading line. Every delivered entry reports where its own top sits
    against that line — and a target crosses the line exactly when it fires,
    so the record is never stale. The LAST target still above the line is the
    one being read. Before the first one crosses — the very top of a page —
    k is -1 and NOTHING is marked, which is also precisely what a reader with
    no JavaScript sees: never a wrong item, only no item. */
 var io=new IntersectionObserver(function(es){
  for(var n=0;n<es.length;n++){
   var i=targets.indexOf(es[n].target); if(i<0)continue;
   var rb=es[n].rootBounds,line=rb?rb.bottom:(window.innerHeight||0)*.45;
   above[i]=es[n].boundingClientRect.top<line;
  }
  for(var k=-1,j=0;j<targets.length;j++)if(above[j])k=j;
  if(k>=0)mark(k);
 },{rootMargin:"-"+Math.round(nav*fs)+"px 0px -55% 0px",threshold:0});
 for(var t=0;t<targets.length;t++)io.observe(targets[t]);
})();
