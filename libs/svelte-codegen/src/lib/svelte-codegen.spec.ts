import { svelteCodegen } from './svelte-codegen';

describe('svelteCodegen', () => {
  it('should work', () => {
    expect(svelteCodegen()).toEqual('svelte-codegen');
  });
});
