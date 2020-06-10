import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { StringUtils } from '../utils/string.utils';

/* --
  SEO (Search Engine Optimization ou Otimização para Ferramentas de Busca)
  consiste na adequação do seu site para que ele seja melhor colocado
  pelas ferramentas de busca
  How to Set HTML Meta tags using Angular 4 - https://www.talkingdotnet.com/
  --
*/
@Injectable({
  providedIn: 'root'
})
export class SeoService {


  constructor(private titleService: Title, private metaService: Meta) {

    // this.titleService = titleService;
    // this.DOM = ɵgetDOM();
    // this.headElement = this.DOM.query('head');
    this.setTitle('');
  }

  public setSeoData(seoModel: SeoModel) {
    this.setTitle(seoModel.title);
    this.setMetaRobots(seoModel.robots);
    this.setMetaDescription(seoModel.description);
    this.setMetaKeywords(seoModel.keywords);
  }


  private setTitle(newTitle: string): void {

    if (StringUtils.isNullOrEmpty(newTitle)) { newTitle = 'Defina um Título'; }
    this.titleService.setTitle(newTitle + ' - Eventos.IO');
  }

  private setMetaDescription(description: string) {
    // this.metaDescription = this.getOrCreateMetaElement('description');
    if (StringUtils.isNullOrEmpty(description)) { description = 'Aqui você encontra um evento técnico próximo de você'; }
    // this.metaDescription.setAttribute('content', description);
    this.metaService.addTag({ name: 'description', content: description });

  }

  private setMetaKeywords(keywords: string) {
    // this.metaKeywords = this.getOrCreateMetaElement('keywords');
    if (StringUtils.isNullOrEmpty(keywords)) { keywords = 'eventos,workshops,encontros,congressos,comunidades,tecnologia'; }
    // this.metaKeywords.setAttribute('content', keywords);
    this.metaService.addTag({ name: 'keywords', content: keywords });
  }

  private setMetaRobots(robots: string) {
    // this.robots = this.getOrCreateMetaElement('robots');
    if (StringUtils.isNullOrEmpty(robots)) { robots = 'all'; }
    // this.robots.setAttribute('content', robots);
    this.metaService.addTag({ name: 'robots', content: robots });
  }


  // private getOrCreateMetaElement(name: string): HTMLElement {

  //   this.meta.addTags([
  //     {name: 'description', content: 'How to use Angular 4 meta service'},
  //     {name: 'author', content: 'talkingdotnet'},
  //     {name: 'keywords', content: 'Angular, Meta Service'}
  //   ]);

  //   let el: HTMLElement;
  //   el = this.DOM.query('meta[name=' + name + ']');
  //   if (el === null) {
  //     el = this.DOM.createElement('meta');
  //     el.setAttribute('name', name);
  //     this.headElement.appendChild(el);
  //   }
  //   return el;
  // }


}

export class SeoModel {
  public title = '';
  public description = '';
  public robots = '';
  public keywords = '';
}
