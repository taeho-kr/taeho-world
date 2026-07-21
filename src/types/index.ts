export interface Project {
	id: number;
	company: Company['id'];
	translationKey: string;
	domains: string[];
	start: string;
	end?: string;
	url?: string;
	images: string[];
	videoUrl?: string;
	techStack: string[];
	onPremise?: boolean;
}

export interface Company {
	id: number;
	name: string;
	url: string;
}
