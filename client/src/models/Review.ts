export default interface Review {
  id: number;
  title: string;
  author: {
    name: string;
    company: {
      name: string;
      link: string
    }
  }
  description: string;
}
