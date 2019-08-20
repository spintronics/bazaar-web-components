import { html, fixture, expect } from '@open-wc/testing';

import { Product } from '../packages/product/product';

window.customElements.define('neo-product', Product);

describe('<product>', () => {
  it('has a default property productId', async () => {
    const el = await fixture('<neo-product></neo-product>');
    expect(el.productID).to.exist;
  });

  it('allows property productId to be overwritten', async () => {
    const el = await fixture(html`
      <neo-product productid="12345"></neo-product>
    `);

    expect(el.productID).to.equal('12345');
  });
});
