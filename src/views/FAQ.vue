<template>
  <div
    class="faq"
  >
    <h2>How it Works</h2>
    <div>
      <FAQ
        v-for="(faq, i) in FAQs"
        :key="i"
        :faq="faq"
        :index="i"
        :open="faq.open"
        @toggleOpen="toggleOpen"
      />
    </div>
  </div>
</template>

<script>
import FAQ from '@/components/FAQ/FAQ.vue';

export default {
  name: 'APP',
  components: { FAQ },
  data() {
    return {
      FAQs: [
        {
          question: 'NFT? ERC-721 tokens?',
          answer: 'NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain, representing rare or unique items that are not interchangeable or replaceable on a one-to-one basis. NFTs are unique digital items such as collectibles or artworks or game items. As an artist, by tokenizing your work you both ensure that it is unique and brand it as your work. The actual ownership is blockchain-managed',
          open: true,
        },
        {
          question: 'What does “minting” mean?',
          answer: 'Minting basically refers to the process of turning digital art into a part of the Ethereum blockchain as a public ledger. The digital art would be tamper-proof and immune to any modifications. Minting an NFT is how your digital art becomes a part of the Ethereum blockchain​–a public ledger that is unchangeable and tamper-proof',
          open: false,
        },
        {
          question: 'Can I create an NFT on Naffiti without putting it on sale?',
          answer: 'Yes, you can and it is up to you if you decide to sell it later or not',
          open: false,
        },
        {
          question: 'Can I change the price of an already created collectible?',
          answer: 'Yes, you can lower the price free of transaction costs at any time. You just need to sign the signature request via your wallet.',
          open: false,
        },
        {
          question: 'Can I gift or send a collectible to someone?',
          answer: 'Yes, just go on the detail page of a collectible you own, open the “...” menu and select “transfer token”',
          open: false,
        },
        {
          question: 'What does “burn a token” mean?',
          answer: 'The ERC-721 standard does not only allow the creation of NFTs, but also includes a possibility to destroy them - i.e. burning the token. Tokens or coins are considered “burned” when they have been purposely and permanently removed from circulation.',
          open: false,
        },
        {
          question: 'How does the royalty system work?',
          answer: 'Whenever you create a collectible you can set a certain percentage as royalty for secondary sales. Example: You create a digital painting and sell it for 0.2 ETH, the royalty is (10-20 percent). Your buyer then sells your painting at a higher price point for 0.5 ETH. Here, the royalty system kicks in. As the original content creator you receive 10-20% of that sale, being 0.05 - 0.10 ETH.',
          open: false,
        },
        {
          question: 'I would like to suggest additional features!',
          answer: 'You are welcomed to provide us valuable insight to marketplace@naffiti.com',
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleOpen(index) {
      this.FAQs = this.FAQs.map((faq, i) => {
        if (index === i) {
          // eslint-disable-next-line no-param-reassign
          faq.open = !faq.open;
        } else {
          // eslint-disable-next-line no-param-reassign
          faq.open = false;
        }
        return faq;
      });
    },
  },
};
</script>
