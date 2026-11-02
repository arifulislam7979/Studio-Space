export interface Istudio {
  _id: string;
  title: string;
  category: string;
  price: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  description: string;
  imageUrl: string;
  amenities: string[];
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  imageUrl?: string;
  date: string;
  hours: number;
  hourlyRate: number;
  securityDeposit: number;
  totalPrice: number;
  userName: string;
  userEmail: string;
  status: string;
}
