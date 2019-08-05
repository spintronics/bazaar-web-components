import { customElement } from 'lit-element';
// import style from './element.style';
import { Icon as MaterialIcon } from '@material/mwc-icon';
// import { layout } from '@bazaar/layout';

@customElement('abu-icon')
// @layout({
//   variables: ['--mdc-icon-size', '--mdc-icon-font', 'color'],
// })
export class Icon extends MaterialIcon {}
