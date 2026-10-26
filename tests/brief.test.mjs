import test from 'node:test';
import assert from 'node:assert/strict';

test('brief creation preserves user content as plain text without sending it', async()=>{
 const {buildBrief}=await import('../brief.mjs');
 assert.equal(buildBrief({name:'  Caio  ',email:'caio@example.com',idea:'<script>uma ideia</script>'}), 'Briefing para a MCode\n\nNome: Caio\nE-mail: caio@example.com\n\nProjeto:\n<script>uma ideia</script>');
});
