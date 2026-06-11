import { useMemo, useState } from "react";
import { Bus, CalendarDays, ChevronDown, Hotel, Info, Map, MapPinned, Ship, Utensils } from "lucide-react";
import { itineraryData } from "./itineraryData";

const typeIcon = { transport: Bus, hotel: Hotel, sights: MapPinned, food: Utensils, ferry: Ship, tip: Info };

const overviewRows = [
  {
    date: "8/12\n三",
    dateDe: "8/12\nMi",
    city: "札幌",
    cityDe: "Sapporo",
    plan: "CI130 13:35 抵達新千歲；JR 快速 Airport 到札幌；入住 Hotel ONE'S RESIDENCE",
    planDe: "CI130 Ankunft 13:35 in New Chitose; JR Rapid Airport nach Sapporo; Check-in im Hotel ONE'S RESIDENCE",
    address: "Hokkaido, Sapporo, Chuo-Ku Minami8Jo Nishi2Chome5-67"
  },
  {
    date: "8/13\n四",
    dateDe: "8/13\nDo",
    city: "小樽",
    cityDe: "Otaru",
    plan: "JR 札幌 -> 小樽；小樽運河、堺町通、音樂盒堂；JR 南小樽 -> 札幌",
    planDe: "JR Sapporo -> Otaru; Otaru-Kanal, Sakaimachi-dori, Musikboxmuseum; JR Minami-Otaru -> Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/14\n五",
    dateDe: "8/14\nFr",
    city: "札幌",
    cityDe: "Sapporo",
    plan: "二條市場、大通公園、時計台、紅磚廳舍、北海道大學；札幌住宿第三晚",
    planDe: "Nijo-Markt, Odori-Park, Uhrenturm, ehemaliges Regierungsgebaeude, Universitaet Hokkaido; dritte Nacht in Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/15\n六",
    dateDe: "8/15\nSa",
    city: "札幌",
    cityDe: "Sapporo",
    plan: "白色戀人公園、円山、北海道神宮、藻岩山夜景；札幌住宿第四晚",
    planDe: "Shiroi Koibito Park, Maruyama, Hokkaido-Schrein, Nachtblick vom Mt. Moiwa; vierte Nacht in Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/16\n日",
    dateDe: "8/16\nSo",
    city: "札幌",
    cityDe: "Sapporo",
    plan: "莫埃來沼公園、羊之丘展望台、大通夏祭/北海盆踊；札幌住宿第五晚",
    planDe: "Moerenuma Park, Hitsujigaoka-Aussichtspunkt, Odori-Sommerfest/Hokkai Bon Odori; fuenfte Nacht in Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/17\n一",
    dateDe: "8/17\nMo",
    city: "旭川",
    cityDe: "Asahikawa",
    plan: "JR 特急札幌 -> 旭川；上野農場、旭川拉麵村；JR 特急回札幌",
    planDe: "JR Limited Express Sapporo -> Asahikawa; Ueno Farm, Asahikawa Ramen Village; JR Limited Express zurueck nach Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/18\n二",
    dateDe: "8/18\nDi",
    city: "登別",
    cityDe: "Noboribetsu",
    plan: "JR 特急札幌 -> 登別；巴士到登別溫泉；地獄谷、伊達時代村；回札幌",
    planDe: "JR Limited Express Sapporo -> Noboribetsu; Bus nach Noboribetsu Onsen; Jigokudani, Date Jidaimura; Rueckfahrt nach Sapporo",
    address: "Hotel ONE'S RESIDENCE"
  },
  {
    date: "8/19\n三",
    dateDe: "8/19\nMi",
    city: "札幌",
    cityDe: "Sapporo",
    plan: "退房；JR 快速 Airport 到新千歲機場；CI131 15:05 起飛",
    planDe: "Check-out; JR Rapid Airport zum Flughafen New Chitose; CI131 Abflug 15:05",
    address: "新千歲機場",
    addressDe: "Flughafen New Chitose"
  }
];

const overviewInfoDe = [
  {
    title: "Routenuebersicht",
    html: "<div class=\"table-wrap\"><table><thead><tr><th>Tag</th><th>Datum</th><th>Stadt/Region</th><th>Schwerpunkt</th><th>Verkehrsknoten</th></tr></thead><tbody><tr><td>Tag 1</td><td>8/12 Mi</td><td>New Chitose, Sapporo</td><td>Ankunft, Spaziergang im Zentrum, Sommerfest-Atmosphaere</td><td>Flughafen New Chitose, JR Sapporo, Odori, Susukino</td></tr><tr><td>Tag 2</td><td>8/13 Do</td><td>Otaru</td><td>Kanal, Sakaimachi-dori, Glas, Musikboxen, Sushi</td><td>JR Sapporo, JR Otaru, Otaru-Kanal, Minami-Otaru</td></tr><tr><td>Tag 3</td><td>8/14 Fr</td><td>Sapporo</td><td>Markt, Stadtgeschichte, Universitaet Hokkaido, Odori</td><td>Nijo-Markt, Odori, Sapporo Station</td></tr><tr><td>Tag 4</td><td>8/15 Sa</td><td>Sapporo</td><td>Shiroi Koibito Park, Maruyama, Hokkaido-Schrein, Mt. Moiwa</td><td>Miyanosawa, Maruyama-koen, Mt. Moiwa Ropeway</td></tr><tr><td>Tag 5</td><td>8/16 So</td><td>Sapporo</td><td>Moerenuma Park, Hitsujigaoka, Sommerfest</td><td>Kanjo-dori-higashi, Fukuzumi, Odori</td></tr><tr><td>Tag 6</td><td>8/17 Mo</td><td>Asahikawa</td><td>Ueno Farm, Ramen Village, Stadtspaziergang</td><td>JR Sapporo, JR Asahikawa</td></tr><tr><td>Tag 7</td><td>8/18 Di</td><td>Noboribetsu</td><td>Jigokudani, Onsen-Ort, Date Jidaimura</td><td>JR Sapporo, JR Noboribetsu, Noboribetsu Onsen Bus Terminal</td></tr><tr><td>Tag 8</td><td>8/19 Mi</td><td>Sapporo, New Chitose</td><td>Check-out, Flughafen, Rueckflug</td><td>JR Sapporo, Flughafen New Chitose</td></tr></tbody></table></div>"
  },
  {
    title: "Verkehr",
    html: "<ul><li>New Chitose nach Sapporo: JR Rapid Airport, tagsueber haeufige Verbindungen, ca. 33-41 Minuten.</li><li>Sapporo nach Otaru: JR Rapid Airport oder Nahverkehrszug; fuer die Stadt eignet sich die Route Otaru Station -> Kanal -> Sakaimachi-dori -> Minami-Otaru.</li><li>Sapporo nach Asahikawa: JR Limited Express Lilac/Kamui, ca. 1 Stunde 25 Minuten.</li><li>Sapporo nach Noboribetsu: JR Limited Express bis Noboribetsu, danach Bus nach Noboribetsu Onsen.</li><li>In Sapporo reichen U-Bahn, wenige Busse und kurze Taxifahrten fuer die meisten Tage.</li></ul>"
  },
  {
    title: "Lage der Unterkunft",
    html: "<p>Hotel ONE'S RESIDENCE liegt im Stadtteil Chuo-ku, nahe Nakajima Park und suedlich von Susukino. Die Lage ist praktisch fuer Abendessen, Tanukikoji, Nijo-Markt und Susukino. Fuer Otaru, Asahikawa, Noboribetsu und den Flughafen sollte morgens extra Zeit fuer den Transfer zur JR Sapporo Station eingeplant werden.</p><ul><li>Nakajima-koen Station: wichtigste U-Bahn-Station, etwa 3-5 Minuten zu Fuss.</li><li>Hosui-Susukino Station: praktisch fuer Fahrten Richtung Fukuzumi/Hitsujigaoka.</li><li>JR Sapporo Station: Ausgangspunkt fuer Tagesausfluege und Flughafenfahrten.</li></ul>"
  },
  {
    title: "Feste und Veranstaltungen",
    html: "<p>Die Reise faellt in die Zeit des Sapporo Summer Festival mit Biergarten im Odori Park, Tanukikoji-Festival und Hokkai Bon Odori. Besonders der Abend am 8/16 eignet sich fuer Bon Odori und Sommerfeststimmung. Otaru Ushio Festival liegt normalerweise Ende Juli und wird voraussichtlich nicht mehr stattfinden. Die Noboribetsu-Feuer- und Hoellenfeste passen nach aktuellem Plan nicht zum Besuchstag.</p>"
  },
  {
    title: "Noch zu pruefen",
    html: "<ul><li>Morgendlicher Transfer vom Hotel zur JR Sapporo Station fuer Otaru, Asahikawa und Noboribetsu.</li><li>Check-in, Gepaeckaufbewahrung und Taxi-Unterstuetzung im Hotel.</li><li>Detailtermine und Lageplaene fuer Sapporo Summer Festival und Bon Odori.</li><li>Oeffnungszeiten beliebter Restaurants in Otaru, Asahikawa und Noboribetsu.</li><li>Ob Einzeltickets, Sapporo-Noboribetsu Area Pass oder Hokkaido Rail Pass guenstiger sind.</li></ul>"
  },
  {
    title: "Quellen",
    html: "<ul><li>JR Hokkaido: Flughafen- und Bahnverbindungen</li><li>Sapporo Travel: Sommerfest, Sehenswuerdigkeiten und Essen</li><li>HOKKAIDO LOVE!: offizielle Sehenswuerdigkeiten in Sapporo, Otaru, Asahikawa und Noboribetsu</li><li>Offizielle Seiten von Shiroi Koibito Park, Moerenuma Park und Noboribetsu Date Jidaimura</li></ul>"
  }
];

const germanDays = [
  {
    html: "<p>13:35 Ankunft am Flughafen New Chitose -> Einreise und Gepaeck -> JR Rapid Airport nach Sapporo -> U-Bahn nach Nakajima-koen oder Taxi zum Hotel ONE'S RESIDENCE -> Gepaeck abstellen/Check-in -> Spaziergang im Odori Park -> Tanukikoji -> Abendessen in Susukino -> zurueck zum Hotel.</p><p>#### 1. Internationales Terminal New Chitose / JR New Chitose Airport Station</p><p>Der Flughafen eignet sich gut fuer erste Snacks, Suessigkeiten und Ramen. Groessere Souvenirs besser am letzten Tag kaufen.</p><p>Unbedingt probieren: Ramen Dojo im Flughafen, falls ihr nach der Ankunft hungrig seid.</p><p>#### 2. JR Sapporo Station</p><p>Sapporo Station ist der wichtigste Knotenpunkt fuer Otaru, Asahikawa, Noboribetsu und den Flughafen. Am ersten Tag lohnt es sich, Bahnsteige und U-Bahn-Uebergaenge kurz kennenzulernen.</p><p>#### 3. Hotel ONE'S RESIDENCE / Nakajima-koen</p><p>Nach Ankunft Gepaeck abstellen, Check-in, Muellregeln und Gepaeckaufbewahrung klaeren. Die Lage ist abends praktisch fuer Susukino.</p><p>#### 4. Odori Park</p><p>Der Odori Park ist die zentrale Achse von Sapporo. Im Sommer gibt es Biergarten und Festivalstaende.</p><p>#### 5. Tanukikoji / Susukino</p><p>Ueberdachte Einkaufsstrasse, Drogerien, Snacks und viele Restaurants. Gut fuer einen lockeren ersten Abend.</p>"
  },
  {
    html: "<p>Hotel ONE'S RESIDENCE -> Nakajima-koen -> Sapporo Station -> JR Otaru Station -> Sankaku Market -> Otaru-Kanal -> Sushi Street -> Sakaimachi-dori -> Kitaichi Glass -> Otaru Music Box Museum -> JR Minami-Otaru -> Sapporo.</p><p>#### 1. Hotel -> Nakajima-koen -> JR Sapporo</p><p>Erster Tagesausflug mit JR. Morgens 20-30 Minuten Puffer einplanen, damit der Umstieg in Sapporo ruhig bleibt.</p><p>#### 2. JR Otaru Station / Sankaku Market</p><p>Der Markt liegt direkt bei der Station und eignet sich fuer Brunch mit Seafood Bowl.</p><p>#### 3. Otaru-Kanal</p><p>Klassischer Spaziergang entlang der Lagerhaeuser und Steinbauten. Tagsueber und am spaeten Nachmittag wirkt die Gegend unterschiedlich.</p><p>#### 4. Sushi Street</p><p>Otaru ist bekannt fuer frischen Fisch und Sushi. Je nach Warteschlange spontan ein Restaurant waehlen.</p><p>#### 5. Sakaimachi-dori / Kitaichi Glass</p><p>Suessigkeiten, Glaswaren, Souvenirs und Cafes. Die Route fuehrt angenehm Richtung Minami-Otaru.</p><p>#### 6. Otaru Music Box Museum / JR Minami-Otaru</p><p>Historisches Gebaeude mit vielen Musikboxen; danach bequem ab Minami-Otaru zurueck nach Sapporo.</p>"
  },
  {
    html: "<p>Hotel -> Nijo Market -> Odori Park und TV Tower -> Uhrenturm -> ehemaliges Regierungsgebaeude -> Universitaet Hokkaido -> Sapporo Station -> Odori/Susukino am Abend.</p><p>#### 1. Hotel -> Nijo Market</p><p>Ruhiger Sapporo-Tag ohne lange Fahrt. Morgens eignet sich der Markt fuer Seafood Bowl.</p><p>#### 2. Odori Park / Sapporo TV Tower</p><p>Zentrale Achse der Stadt und guter Einstieg in die Innenstadt.</p><p>#### 3. Sapporo Clock Tower</p><p>Kurzer historischer Fotostopp auf dem Weg Richtung Sapporo Station.</p><p>#### 4. Ehemaliges Regierungsgebaeude Hokkaido</p><p>Roter Backsteinbau mit Garten; bei Baustellen reicht ein kurzer Aussenstopp.</p><p>#### 5. Universitaet Hokkaido</p><p>Gruener Campus, angenehm fuer einen Spaziergang. Bei Hitze lieber kuerzer halten und in die unterirdischen Einkaufsbereiche ausweichen.</p><p>#### 6. Susukino / Odori am Abend</p><p>Abendessen, Ramen oder Soup Curry; Rueckweg zum Hotel ist kurz.</p>"
  },
  {
    html: "<p>Hotel -> U-Bahn nach Miyanosawa -> Shiroi Koibito Park -> Maruyama-koen -> Hokkaido-Schrein und Maruyama Park -> Abendessen -> Mt. Moiwa Nachtblick -> Hotel.</p><p>#### 1. Hotel -> Miyanosawa</p><p>U-Bahn ueber Odori zur Tozai-Linie. Ein einfacher Stadttag ohne Gepaeck.</p><p>#### 2. Shiroi Koibito Park</p><p>Suesswaren-Themenpark mit Desserts, Shops und Fotospots. Gut fuer Familien.</p><p>#### 3. Maruyama Park / Hokkaido-Schrein</p><p>Ruhigere, gruene Seite von Sapporo. Bei Hitze die Runde kuerzer halten.</p><p>#### 4. Abendessen</p><p>Jingisukan, Seafood Izakaya oder Essen in Susukino/Odori vor Mt. Moiwa.</p><p>#### 5. Mt. Moiwa Ropeway</p><p>Sehr schoener Nachtblick ueber Sapporo. Bei Regen oder tiefen Wolken auf Tag 5 verschieben oder auslassen.</p>"
  },
  {
    html: "<p>Hotel -> Kanjo-dori-higashi -> Bus zum Moerenuma Park -> leichte Mahlzeit -> zurueck in die Stadt -> Fukuzumi -> Bus nach Hitsujigaoka -> Odori Summer Festival/Bon Odori -> Hotel.</p><p>#### 1. Hotel -> Kanjo-dori-higashi -> Moerenuma Park</p><p>Der Tag ist verteiltem Nahverkehr gewidmet. Morgens zuerst Moerenuma einplanen.</p><p>#### 2. Moerenuma Park</p><p>Von Isamu Noguchi gestalteter Landschaftspark mit Glaspyramide, Huegeln, Brunnen und weiten Wiesen.</p><p>#### 3. Fukuzumi -> Hitsujigaoka</p><p>Nachmittags per U-Bahn und Bus zum Aussichtspunkt; bei Zeitdruck kann dieser Punkt entfallen.</p><p>#### 4. Hitsujigaoka Observation Hill</p><p>Clark-Statue, Weideland und Blick auf Sapporo. Nicht zu lange einplanen.</p><p>#### 5. Odori Park / Tanukikoji</p><p>Letzter Abend fuer Hokkai Bon Odori und Sommerfeststimmung. Danach Essen oder Snacks rund um Tanukikoji/Susukino.</p>"
  },
  {
    html: "<p>Hotel -> Sapporo Station -> JR Limited Express nach Asahikawa -> Ueno Farm -> Asahikawa Ramen Village -> Heiwa-dori Shopping Park -> JR zurueck nach Sapporo.</p><p>#### 1. Hotel -> JR Sapporo</p><p>Morgens zur Sapporo Station und mit Lilac/Kamui nach Asahikawa. Sitzplatz und Zugzeit am Vorabend pruefen.</p><p>#### 2. JR Asahikawa Station</p><p>Verkehrszentrum des Tages; Getraenke und Snacks fuer spaeter besorgen.</p><p>#### 3. Ueno Farm</p><p>Sommerlicher Garten mit Blumen und Hokkaido-Landschaft. Ruhiger Programmpunkt.</p><p>#### 4. Asahikawa Ramen Village</p><p>Mehrere bekannte Ramen-Laeden; Asahikawa-Ramen ist oft shoyu-basiert.</p><p>#### 5. Heiwa-dori / Innenstadt</p><p>Fussgaengerzone fuer Kaffee, Dessert oder kurzen Stadtspaziergang vor der Rueckfahrt.</p>"
  },
  {
    html: "<p>Hotel -> Sapporo Station -> JR Limited Express nach Noboribetsu -> Bus nach Noboribetsu Onsen -> Jigokudani -> Oyunuma/Natur-Fussbad -> Gokuraku-dori -> Date Jidaimura -> Rueckfahrt nach Sapporo.</p><p>#### 1. Hotel -> JR Sapporo -> JR Noboribetsu</p><p>Langer Tagesausflug. Frueh starten und Busanschluss nach Noboribetsu Onsen pruefen.</p><p>#### 2. Noboribetsu Onsen Bus Terminal / Onsen-Ort</p><p>Zentrum fuer Spaziergaenge, Essen, Souvenirs und Rueckbus. Rueckfahrzeiten zuerst notieren.</p><p>#### 3. Jigokudani</p><p>Vulkanisches Tal mit Dampf, Schwefelgeruch und dramatischer Landschaft; wichtigster Stopp des Tages.</p><p>#### 4. Oyunuma / Natur-Fussbad</p><p>Nur bei gutem Wetter und guter Weglage verlaengern; bei Regen kurz halten.</p><p>#### 5. Gokuraku-dori</p><p>Hauptstrasse fuer Mittagessen und Souvenirs. Probieren: Enma Yakisoba, Onsen Ichiba oder scharfe Jigoku-Ramen.</p><p>#### 6. Noboribetsu Date Jidaimura</p><p>Edo-Themenpark mit Shows und Kulissen, fuer Jugendliche wahrscheinlich abwechslungsreich.</p><p>#### 7. Onsen-Ort / Rueckfahrt</p><p>Wenn Zeit bleibt, kurzer Tages-Onsen oder Souvenirs; danach Bus zur JR Station und zurueck nach Sapporo.</p>"
  },
  {
    html: "<p>Fruehstueck -> Check-out -> optional letzte Einkaeufe in Susukino/Odori, falls Gepaeckaufbewahrung moeglich ist -> Sapporo Station -> JR Rapid Airport nach New Chitose -> Mittagessen und Souvenirs -> CI131 Abflug 15:05.</p><p>#### 1. Hotel ONE'S RESIDENCE / Nakajima-koen</p><p>Morgens auschecken. Wenn Gepaeckaufbewahrung moeglich ist, noch kurz in der Stadt einkaufen; sonst direkt zum Flughafen.</p><p>#### 2. JR Sapporo Station</p><p>Mit U-Bahn oder Taxi zur Sapporo Station. Fuer Bahnsteig und Wartezeit Puffer einplanen.</p><p>#### 3. Internationales Terminal New Chitose</p><p>Mindestens gegen 12:00 am Flughafen sein. Im Sommer koennen Check-in, Gepaeck und Einkaeufe Zeit brauchen.</p><p>Souvenirs/Essen: Royce, Rokkatei, Kitakaro, Shiroi Koibito, LeTAO, Milchdesserts, Mais-Snacks, Jaga Pokkuru oder Ramen Dojo.</p>"
  }
];

function Html({ html }) {
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />;
}

function text(item, lang) {
  if (Array.isArray(item)) return lang === "de" ? item[1] : item[0];
  if (item && typeof item === "object") return lang === "de" ? item.de : item.zh;
  return item;
}

function weekdayLabel(weekday, lang) {
  if (lang !== "de") return weekday;
  return { 一: "Mo", 二: "Di", 三: "Mi", 四: "Do", 五: "Fr", 六: "Sa", 日: "So" }[weekday] || weekday;
}

function Block({ block, lang, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = typeIcon[block.type] || Info;
  return (
    <section className={`accordion block-${block.type}`}>
      <button className="accordion-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="block-icon"><Icon size={18} /></span>
        <span>{lang === "de" ? block.titleDe : block.title}</span>
        <ChevronDown className={open ? "chevron open" : "chevron"} size={18} />
      </button>
      {open && <Html html={lang === "de" ? block.htmlDe : block.html} />}
    </section>
  );
}

function splitHtmlSteps(html) {
  const pattern = /<p>####\s*(?:\d+\.\s*)?(.+?)<\/p>/g;
  const matches = [...html.matchAll(pattern)];

  if (matches.length === 0) return [];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? html.length;
    return {
      title: match[1].replace(/&gt;/g, ">").trim(),
      html: html.slice(start, end).trim()
    };
  });
}

function RouteStep({ step, index }) {
  const Icon = index === 0 ? Bus : index === 1 ? MapPinned : index === 2 ? Utensils : Info;
  return (
    <section className="route-step">
      <div className="step-index">{index + 1}</div>
      <div className="step-body">
        <button className="step-heading" type="button" aria-expanded="true">
          <span className="step-icon"><Icon size={22} /></span>
          <span>{step.title}</span>
          <ChevronDown size={18} />
        </button>
        {step.html && <Html html={step.html} />}
      </div>
    </section>
  );
}

function RouteBlock({ block, lang }) {
  const html = lang === "de" ? block.htmlDe : block.html;
  const steps = splitHtmlSteps(html);
  const introHtml = steps.length > 0 ? html.slice(0, html.indexOf("<p>####")).trim() : html;
  const heading = lang === "de" ? block.titleDe : block.title;

  return (
    <div className="route-block">
      <section className="route-summary">
        <div className="step-body">
          <button className="step-heading" type="button" aria-expanded="true">
            <span className="step-icon"><Bus size={22} /></span>
            <span>{heading}</span>
            <ChevronDown size={18} />
          </button>
          <Html html={introHtml} />
        </div>
      </section>
      {steps.map((step, index) => <RouteStep key={`${step.title}-${index}`} step={step} index={index} />)}
    </div>
  );
}

function Overview({ lang }) {
  const country = itineraryData.countryInfo;
  const infoSections = lang === "de" ? overviewInfoDe : itineraryData.infoSections;
  return (
    <main className="overview-grid">
      <section className="overview-panel wide-panel overview-table-panel">
        <div className="panel-label"><CalendarDays size={28} />{lang === "de" ? "Unterkunft und Verkehr" : "住宿與交通"}</div>
        <div className="table-wrap overview-table-wrap">
          <table className="overview-table">
            <thead>
              <tr>
                <th>{lang === "de" ? "Datum" : "日期"}</th>
                <th>{lang === "de" ? "Stadt" : "城市"}</th>
                <th>{lang === "de" ? "Unterkunft / Verkehr" : "已訂住宿 / 交通"}</th>
                <th>{lang === "de" ? "Adresse / Ziel" : "地址 / 到達點"}</th>
              </tr>
            </thead>
            <tbody>
              {overviewRows.map((row) => (
                <tr key={`${row.date}-${row.city}`}>
                  <td>{(lang === "de" ? row.dateDe : row.date).split("\n").map((line) => <span key={line}>{line}</span>)}</td>
                  <td>{lang === "de" ? row.cityDe : row.city}</td>
                  <td>{lang === "de" ? row.planDe : row.plan}</td>
                  <td>{lang === "de" ? row.addressDe || row.address : row.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overview-panel wide-panel intro-panel">
        <div className="panel-label"><Info size={20} />{lang === "de" ? "Reiseüberblick" : "行程總覽"}</div>
        {itineraryData.intro.map((item, index) => <Html key={index} html={text(item, lang)} />)}
      </section>
      {country && (
        <section className="overview-panel country-panel">
          <div className="panel-label"><Map size={16} />{text(country.name, lang)}</div>
          <div className="country-table">
            {country.rows.map((row) => (
              <div className="country-row" key={row[0]}>
                <span>{lang === "de" ? row[1] : row[0]}</span>
                <Html html={text(row[2], lang)} />
              </div>
            ))}
          </div>
          <ul className="note-list">{country.notes.map((note, index) => <li key={index}>{text(note, lang)}</li>)}</ul>
        </section>
      )}
      {infoSections.map((section) => (
        <section className="overview-panel wide-panel" key={section.title}>
          <div className="panel-label"><CalendarDays size={16} />{section.title}</div>
          <Html html={section.html} />
        </section>
      ))}
    </main>
  );
}

function DayDetail({ day, index, lang }) {
  const germanDay = germanDays[index];
  const displayBlocks = lang === "de" && germanDay
    ? [{ title: "Routenvorschlag", titleDe: "Routenvorschlag", html: germanDay.html, htmlDe: germanDay.html, type: "transport" }]
    : day.blocks;
  return (
    <article className="day-detail">
      <header className="day-detail-head">
        <div>
          <span className="day-kicker">{lang === "de" ? `TAG ${index + 1}` : `DAY ${index + 1}`}</span>
          <h2>{lang === "de" ? day.titleDe : day.title}</h2>
        </div>
        <div className="date-pill">{day.date} {weekdayLabel(day.weekday, lang)}</div>
      </header>
      <div className="route-stack">
        {displayBlocks.map((block, blockIndex) => <RouteBlock key={`${block.title}-${blockIndex}`} block={block} lang={lang} />)}
      </div>
    </article>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("trip-lang") || "zh");
  const [active, setActive] = useState("overview");
  const activeDay = useMemo(() => itineraryData.days[Number(active)], [active]);

  function changeLang(nextLang) {
    setLang(nextLang);
    localStorage.setItem("trip-lang", nextLang);
    document.documentElement.lang = nextLang === "de" ? "de" : "zh-TW";
  }

  function selectTimelineItem(nextActive, event) {
    setActive(nextActive);
    event.currentTarget.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="topbar">
          <div />
          <div className="language-switch" aria-label="Language switch">
            <button className={lang === "zh" ? "active" : ""} type="button" onClick={() => changeLang("zh")}>中文</button>
            <button className={lang === "de" ? "active" : ""} type="button" onClick={() => changeLang("de")}>Deutsch</button>
          </div>
        </nav>
        <div className="hero-copy">
          <h1>{lang === "de" ? "Hokkaido Japan: 8 Tage" : "日本北海道8日遊"}</h1>
          <div className="city-tags">{itineraryData.cities.map((city) => <span key={city.name}>{lang === "de" ? city.labelDe : city.label}</span>)}</div>
        </div>
      </header>

      <div className="layout">
        <aside className="timeline" aria-label="Itinerary timeline">
          <button className={active === "overview" ? "timeline-item active" : "timeline-item"} type="button" onClick={(event) => selectTimelineItem("overview", event)}>
            <span className="timeline-dot"><Info size={15} /></span>
            <span><strong>{lang === "de" ? "Übersicht" : "總覽"}</strong><small>{lang === "de" ? "Reiseinfos" : "行程資訊"}</small></span>
          </button>
          {itineraryData.days.map((day, index) => (
            <button className={active === String(index) ? "timeline-item active" : "timeline-item"} type="button" key={`${day.date}-${day.title}`} onClick={(event) => selectTimelineItem(String(index), event)}>
              <span className="timeline-dot">{index + 1}</span>
              <span><strong>{day.date}</strong><small>{lang === "de" ? day.cityDe : day.city}</small></span>
            </button>
          ))}
        </aside>

        <section className="content-stage">
          {active === "overview" ? <Overview lang={lang} /> : <DayDetail day={activeDay} index={Number(active)} lang={lang} />}
        </section>
      </div>
    </div>
  );
}
