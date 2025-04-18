export interface Project {
	id: number;
	company: Company['id'];
	name: string;
	domains: string[];
	start: string;
	end?: string;
	url?: string;
	images: string[];
	videoUrl?: string;
	singleSentence: string;
	description: React.ReactNode;
	techStack: string[];
}

export interface Company {
	id: number;
	name: string;
	url: string;
}
