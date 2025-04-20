export interface Song {
	id: string;
	title: string;
	uploaderId: string;
	albumId: string | null;
	coverUrl: string;
	audioUrl?: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
	User?: {
	  id: string;
	  username: string;
	};
	Likers?: {
	  id: string;
	  username: string;
	}[];
  }

export interface User {
	id: string;
	email: string;
	username: string;
}
  
export interface Credential {
	id?: string; 
	email: string;
	password: string;
	username?: string; 
}


