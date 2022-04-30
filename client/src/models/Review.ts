export default interface Review {
  id: number;
  author: {
    name: string;
    position: string;
    photo?: string;
    company: {
      name: string;
      link: string;
    }
  }
  description: string;
}
