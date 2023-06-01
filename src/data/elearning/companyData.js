import company1 from 'assets/img/e-learning/companys/company1.png';
import company2 from 'assets/img/e-learning/companys/company2.png';
import company3 from 'assets/img/e-learning/companys/company3.png';
import beachVideo from 'assets/video/beach.mp4';
import beachPoster from 'assets/video/beach.jpg';

export const companyFilters = [
  {
    label: 'Category',
    options: [
      {
        label: '상장사',
        icon: 'file-alt',
        type: 'checkbox',
        value: '상장',
        name: '상장'
      },
      {
        label: '비상장사',
        icon: 'file-invoice-dollar',
        type: 'checkbox',
        value: '비상장',
        name: '비상장'
      }
    ]
  },
  {
    label: '거래소',
    options: [
      {
        label: 'KOSPI200',
        icon: 'brush',
        type: 'checkbox',
        value: 'KOSPI200',
        name: 'KOSPI200'
      },
      {
        label: 'KOSPI',
        icon: 'globe',
        type: 'checkbox',
        value: 'KOSPI',
        name: 'KOSPI'
      },
      {
        label: 'KOSDAQ',
        icon: 'code',
        type: 'checkbox',
        value: 'KOSDAQ',
        name: 'KOSDAQ'
      }
    ]
  },
  {
    label: '지분율',
    options: [
      {
        label: '4.5 & Up',
        icon: 'star',
        type: 'radio',
        name: 'rating',
        value: 4.5
      },
      {
        label: '4.0 & Up',
        icon: 'star',
        type: 'radio',
        name: 'rating',
        value: 4.0
      },
      {
        label: '3.5 & Up',
        icon: 'star',
        type: 'radio',
        name: 'rating',
        value: 3.5
      },
      {
        label: '3.0 & Up',
        icon: 'star',
        type: 'radio',
        name: 'rating',
        value: 3.0
      }
    ]
  }
];

const tags = {
  writing: {
    id: 1,
    type: 'primary',
    content: '상장사',
    icon: 'pen-nib'
  },
  topTrainer: {
    id: 2,
    type: 'success',
    content: '기업',
    icon: 'crown'
  },
  editorsChoice: {
    id: 3,
    type: 'warning',
    content: 'Editor’s Choice',
    icon: 'award'
  },
  misc: {
    id: 4,
    type: 'primary',
    content: '투표중',
    icon: 'thumbtack'
  },
  design: {
    id: 5,
    type: 'primary',
    content: '투표종료',
    icon: 'brush'
  },
  bestSeller: {
    id: 6,
    type: 'success',
    content: '인기',
    icon: 'hashtag'
  },
  painting: {
    id: 7,
    type: 'primary',
    content: 'Painting',
    icon: 'palette'
  }
};

export const companyData = [
  {
    id: 'CN000001',
    name: '전자투표 및 전자위임 제도 채택 건의',
    price: 69.99,
    oldPrice: 11,
    excerpt:
      '기업의 주식시장 상장으로 투자자는 투자와 매각의 편이성이 높아졌지만, 이로인한 기업 소유 구조의 분산은 최대주주 위주의 지배구조를 더욱 강화시킨다. 이로인해 주주들은 권리의 행사보다는 투자 수익에 초점을 맞춘다. 하지만, 기업이 전자투표 및 전자위임 제도를 채택할 경우, 기업의 지배구조는 더욱 투명성을 가질 수 있고 이를 기반으로 ESG 철학에 부응하는 사업전략을 갖추게 될 수 있다.',
    trainer: '밸런시움',
    thumbnail: {
      image: company1,
      video: beachVideo,
      videoPoster: beachPoster
    },
    totalEnrolled: 92632,
    rating: 4.8,
    review: 78259,
    tags: [tags.writing, tags.topTrainer, tags.editorsChoice]
  },
  {
    id: 'CN000002',
    name: '트러스톤운용, BYC 주주행동 예고…“ESG 개선돼야”',
    price: 39.99,
    oldPrice: 139,
    excerpt:
      '트러스톤자산운용이 BYC(001460)에 대해 주주행동을 예고했다.트러스톤자산운용은 23일 주주로서 좀 더 적극적인 주주활동을 수행하기 위함이라면서 BYC 보유 목적을 ‘경영참가 목적’으로 변경 공시했다. 22일 기준 BYC 주식을 5만780주(8.13%, 의결권 행사가능주식 8.06%) 보유하고 있다.',
    trainer: '키키쿵',
    thumbnail: {
      image: company2,
      video: beachVideo,
      videoPoster: beachPoster
    },
    totalEnrolled: 92603,
    rating: 4.9,
    review: 34567,
    tags: [tags.misc]
  },
  {
    id: 'CN000003',
    name: '명신산업 주식담보대출 반대',
    price: 69.55,
    oldPrice: 12,
    excerpt:
      'Explore all the advanced design tools like Photoshop, Illustrator, Krita, Procreate, & Inkscape; trace the evolution of graphic design with us, from the first breakthrough of image development to today’s AI assisted designs. Begin your visual language journey with these advanced design tools.',
    trainer: '포도나무',
    thumbnail: {
      image: company3,
      video: beachVideo,
      videoPoster: beachPoster
    },
    totalEnrolled: 11000,
    rating: 4.5,
    review: 108009,
    tags: [tags.design, tags.bestSeller],
    wishlisted: true
  }
];
