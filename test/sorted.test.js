import { html, fixture, expect } from '@open-wc/testing';

import { Sorted } from '../packages/sorted/sorted';
import { nextAnimationFrame } from './sutra';

window.customElements.define('neo-sorted', Sorted);

let getSorted = _ =>
  fixture(html`
    <neo-sorted>
      <div slot="0" category="a">0</div>
      <div slot="1" category="b">1</div>
      <div slot="2" category="a">2</div>
      <div slot="3" category="b">3</div>
      <div slot="4" category="a">4</div>
    </neo-sorted>
  `);

let sorted = getSorted();

describe('<sorted>', async () => {
  it('automatically creates slots to match the number of children', async () => {
    let el = await sorted;
    expect(el.children.length).to.equal(5);
  });

  it('sorts by given attribute', async () => {
    let el = await sorted;
    expect(el.order.join('')).to.equal('01234');
    el.setAttribute('sort', 'slot:desc');
    await nextAnimationFrame();
    expect(el.order.join('')).to.equal('43210');
    el.setAttribute('sort', 'category:asc|slot:asc');
    await nextAnimationFrame();
    expect(el.order.join('')).to.equal('02413');
  });

  it('applies the offset after sorting', async () => {
    let el = await sorted;
    el.setAttribute('sort', 'slot:asc');
    el.setAttribute('offset', '1');
    await nextAnimationFrame();
    expect(el.order.join('')).to.equal('12340');
  });
});
