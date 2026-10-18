import { Link } from "react-router-dom";
import type { HomePageSection } from "./types/section";
import SubSectionCard from "./SubSectionCard";
import "./ui/SectionCard.css";

export default function SectionCard({section}: {section: HomePageSection}) {
    const hasChildren = section.children && section.children.length > 0;

    if (hasChildren) {
        return (
            <div className="section-card section-card-parent">
                <div className="section-card-header">
                    <p className="section-card-title">{section.title}</p>
                    <span className="section-group-badge">
                        {section.children!.length} підгрупи
                    </span>
                </div>
                
                <div className="subgroups-container-grid">
                    {section.children!.map(child => (
                        <SubSectionCard key={child.slug} section={child} />
                    ))}
                </div>

                <Link 
                    to={"/section/" + section.slug}
                    className="section-parent-footer-link"
                >
                    Переглянути всю групу <span>→</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="section-card section-card-main">
            <p className="section-card-title">{section.title}</p>
            <Link 
                className="section-card-single-link text-decoration-none" 
                to={"/section/" + section.slug}
            >
                <div className="img-wrapper">
                    <img src={section.imageUrl} alt={section.title} loading="lazy" />
                </div>
                <div className="main-card-footer">
                    <p className="bottom-title">{section.title}</p>
                    <span className="view-btn">Переглянути →</span>
                </div>
            </Link>
        </div>
    );
}
