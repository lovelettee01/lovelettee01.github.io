import company1 from 'assets/img/e-learning/companys/company1.png';
import company2 from 'assets/img/e-learning/companys/company2.png';
import company3 from 'assets/img/e-learning/companys/company3.png';
import company5 from 'assets/img/e-learning/companys/company5.png';
import company7 from 'assets/img/e-learning/companys/company7.png';
import company8 from 'assets/img/e-learning/companys/company8.png';

export const spendingsData = [85, 60, 120, 70, 100, 15, 65, 80, 60, 75, 45];

export const timeOnSiteData = [55, 60, 40, 120, 70, 80, 35, 80, 85];

export const assignmentScores = [
  {
    id: 0,
    range: '90-100%',
    companys: 10,
    color: 'success',
    badge: {
      type: 'success',
      content: '2.1%',
      icon: 'caret-up'
    }
  },
  {
    id: 1,
    range: '70-90%',
    companys: 16,
    color: 'primary',
    badge: {
      type: 'danger',
      content: '5.1%',
      icon: 'caret-down'
    }
  },
  {
    id: 2,
    range: '40-70%',
    companys: 12,
    color: 'info',
    badge: {
      type: 'secondary',
      content: '0.0%'
    }
  },
  {
    id: 3,
    range: '0-40%',
    companys: 2,
    color: 'warning',
    badge: {
      type: 'primary',
      content: '3.5%',
      icon: 'plus'
    }
  }
];

export const companyStatusData = [
  {
    id: 0,
    title: 'Completed Companys',
    color: 'primary',
    companys: 13,
    badge: {
      type: 'success',
      content: '2.1%',
      icon: 'caret-up'
    }
  },
  {
    id: 1,
    title: 'Dropped Companys',
    color: 'warning',
    companys: 10,
    badge: {
      type: 'primary',
      content: '3.5%',
      icon: 'caret-up'
    }
  },
  {
    id: 2,
    title: 'Refund Claimed',
    color: 'success',
    companys: 7,
    badge: {
      type: 'secondary',
      content: '0.00%'
    }
  },
  {
    id: 3,
    title: 'On-going Companys',
    color: 'info',
    companys: 20,
    badge: {
      type: 'danger',
      content: '5.1%',
      icon: 'caret-down'
    }
  }
];

export const payments = [
  {
    companyId: '123232',
    invoice: 'FA613145',
    amount: 39.99,
    date: '01/10/21',
    status: 'Pending',
    color: 'warning'
  },
  {
    companyId: '147832',
    invoice: 'LC014357',
    amount: 19.99,
    date: '12/12/21',
    status: 'Successful',
    color: 'success'
  },
  {
    companyId: '965473',
    invoice: 'FC657916',
    amount: 35.99,
    date: '23/08/21',
    status: 'Pending',
    color: 'warning'
  },
  {
    companyId: '854763',
    invoice: 'TN654236',
    amount: 20.99,
    date: '09/04/21',
    status: 'Denied',
    color: 'danger'
  },
  {
    companyId: '232645',
    invoice: 'ON820965',
    amount: 45.49,
    date: '03/09/21',
    status: 'Successful',
    color: 'success'
  },
  {
    companyId: '232471',
    invoice: 'TN755429',
    amount: 99.95,
    date: '31/12/21',
    status: 'Denied',
    color: 'danger'
  },
  {
    companyId: '232558',
    invoice: 'TN789426',
    amount: 55.95,
    date: '31/12/21',
    status: 'Pending',
    color: 'warning'
  }
];

export const recentActivities = [
  {
    id: 0,
    title: 'Logged out',
    description: 'Logged out from cart screen',
    time: '3h ago',
    icon: 'sign-out-alt'
  },
  {
    id: 1,
    title: 'Added company#123456 to cart',
    description: 'Added company to cart, Did not pay, Left cart',
    time: '3h ago',
    icon: 'shopping-cart'
  },
  {
    id: 2,
    title: 'Downloaded Materials of #121212',
    description: '3 pdf files were downloaded, learner completed 75% ',
    time: '3h ago',
    icon: 'download'
  },
  {
    id: 3,
    title: 'Sent a direct mail to Tra_bil37a8',
    description: 'Tra_bil37a8 is trainer of company#121212 ',
    time: '5h ago',
    icon: 'envelope'
  },
  {
    id: 4,
    title: 'Submitted assignment no.3',
    description: 'Assignment of company#121212 was due yesterday.',
    time: '5h ago',
    icon: 'file-upload'
  }
];

export const enrolledCompanysData = [
  {
    title: 'Advanced Design Tools for Modern Designs',
    image: company3,
    trainer: 'Bill finger',
    enrollmentDate: '01/10/21',
    worked: '12h:50m:00s',
    progress: 75,
    price: 39.99
  },
  {
    title: 'Character Design Masterclass: Your First Superhero',
    image: company8,
    trainer: 'Bruce Timm',
    enrollmentDate: '01/10/21',
    worked: '10h:40m:50s',
    progress: 60,
    price: 69.99
  },
  {
    title: 'Script Writing Masterclass: Introdution to Industry Cliches',
    image: company1,
    trainer: 'Bill finger',
    enrollmentDate: '01/10/21',
    worked: '12h:50m:00s',
    progress: 55,
    price: 69.55
  },
  {
    title: 'Abstract Painting: Zero to Mastery in Traditional Medium',
    image: company5,
    trainer: 'J. H. Williams III',
    enrollmentDate: '03/09/21',
    worked: '38h:10m:09s',
    progress: 85,
    price: 45.49
  },
  {
    title: 'Character Design Masterclass: Your First Supervillain',
    image: company7,
    trainer: 'Bill finger',
    enrollmentDate: '01/10/21',
    worked: '02h:29m:00s',
    progress: 25,
    price: 39.99
  },
  {
    title: 'Composition in Comics: Easy to Read Between Panels',
    image: company2,
    trainer: 'Bill finger',
    enrollmentDate: '31/12/21',
    worked: '00h:50m:30s',
    progress: 15,
    price: 99.99
  }
];
