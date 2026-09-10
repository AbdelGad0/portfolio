import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import SiteSettings from "@/models/SiteSettings";
import ThemeSettings from "@/models/ThemeSettings";
import AdminCredential from "@/models/AdminCredential";
import AuditLog from "@/models/AuditLog";
import Project from "@/models/Project";
import CategoryGroup from "@/models/CategoryGroup";
import SkillCategory from "@/models/SkillCategory";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Certification from "@/models/Certification";
import Message from "@/models/Message";
import bcrypt from "bcryptjs";
import { DEFAULT_SECTIONS } from "@/lib/constants";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seeding is disabled in production" }, { status: 403 });
  }

  await connectToDatabase();

  await Promise.all([
    Profile.deleteMany({}),
    SiteSettings.deleteMany({}),
    ThemeSettings.deleteMany({}),
    AdminCredential.deleteMany({}),
    AuditLog.deleteMany({}),
    Project.deleteMany({}),
    CategoryGroup.deleteMany({}),
    SkillCategory.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Certification.deleteMany({}),
    Message.deleteMany({})
  ]);

  const profile = await Profile.create({
    nameEn: "Abdelrahman Ahmed",
    nameAr: "عبدالرحمن أحمد",
    headlineEn: "I turn data into real business impact.",
    headlineAr: "أحوّل البيانات إلى أثر حقيقي في الأعمال.",
    titleEn: "ML & Data Analyst",
    titleAr: "محلل بيانات وذكاء اصطناعي",
    subtitleEn: "Deep Learning | NLP | RAG | CNN | Python | SQL | Power BI",
    subtitleAr: "تعلم عميق | معالجة لغة طبيعية | استرجاع معزز | شبكات عصبية | بايثون | SQL",
    profileImage: "/assets/Me.jpeg",
    showProfilePhoto: true,
    profilePhotoPosition: "50% 38%",
    summaryEn: "ML & Data Analyst specializing in machine learning, deep learning, NLP and RAG. I build end-to-end data-driven solutions that turn raw data into business decisions.",
    summaryAr: "محلل بيانات وذكاء اصطناعي متخصص في التعلم الآلي والتعلم العميق ومعالجة اللغة الطبيعية وأنظمة الاسترجاع المعزز. أبني حلولاً تعتمد على البيانات تحول البيانات الخام إلى قرارات عملية.",
    aboutEn:
      "I'm Abdelrahman Ahmed, an ML & Data Analyst based in Egypt. I specialize in building end-to-end machine learning and data analysis solutions. My work covers deep learning, NLP, RAG systems, computer vision (CNNs), churn prediction, and exploratory data analysis.\n\nI have hands-on experience with Python, Scikit-learn, TensorFlow/Keras, PyTorch, Power BI, and MongoDB. I also build web applications (React/Next.js) and data pipelines to ship complete products.\n\nI'm passionate about turning complex data problems into clear, actionable insights and business impact.",
    aboutAr:
      "أنا عبدالرحمن أحمد، محلل بيانات وذكاء اصطناعي من مصر. أتخصص في بناء حلول شاملة للتعلم الآلي وتحليل البيانات. تشمل أعمالي التعلم العميق ومعالجة اللغة الطبيعية وأنظمة الاسترجاع المعزز ورؤية الحاسوب وتحليل التغيير والاستكشافي للبيانات.\n\nلدي خبرة عملية مع بايثون وScikit-learn وTensorFlow/Keras وPyTorch وPower BI وMongoDB. كما أبني تطبيقات ويب باستخدام React/Next.js وخطوط بيانات لإنتاج منتجات متكاملة.\n\nأشغف بتحويل مشكلات البيانات المعقدة إلى رؤى واضحة وقابلة للتنفيذ وأثر ملموس على الأعمال.",
    email: "abdelrahman.ahmed.gad@gmail.com",
    phone: "+201064098392",
    locationEn: "Egypt",
    locationAr: "مصر",
    github: "https://github.com/AbdelGad0",
    linkedin: "https://www.linkedin.com/in/abdelrahman-ahmed-gad",
    kaggle: "",
    whatsapp: "201064098392",
    twitter: "",
    ctaHireMeEn: "Hire Me",
    ctaHireMeAr: "وظفني",
    ctaDownloadCvEn: "Download CV",
    ctaDownloadCvAr: "تحميل السيرة",
    availableForWork: true,
    availabilityLabelEn: "Available for work",
    availabilityLabelAr: "متاح للعمل",
    highlightsEn: ["Machine Learning", "Deep Learning", "NLP & RAG", "Data Analysis"],
    highlightsAr: ["التعلم الآلي", "التعلم العميق", "معالجة اللغة والاسترجاع المعزز", "تحليل البيانات"]
  });

  const theme = await ThemeSettings.create({
    singletonKey: "theme",
    colorTheme: "purple-ai",
    radius: "soft",
    cardStyle: "premium",
    typographyScale: "balanced",
    sectionSpacing: "normal"
  });

  const settings = await SiteSettings.create({
    siteTitleEn: "Abdelrahman Ahmed — ML & Data Analyst",
    siteTitleAr: "عبدالرحمن أحمد — محلل بيانات وذكاء اصطناعي",
    defaultMetaTitleEn: "Abdelrahman Ahmed — ML & Data Analyst",
    defaultMetaTitleAr: "عبدالرحمن أحمد — محلل بيانات وذكاء اصطناعي",
    siteNameEn: "Abdelrahman Ahmed",
    siteNameAr: "عبدالرحمن أحمد",
    defaultMetaDescriptionEn:
      "Abdelrahman Ahmed — ML & Data Analyst building machine learning solutions, data pipelines, Deep Learning, NLP, RAG and data analysis tools that turn data into real business impact.",
    defaultMetaDescriptionAr:
      "عبدالرحمن أحمد — محلل بيانات وذكاء اصطناعي يبني حلول التعلم الآلي وخطوط البيانات والتعلم العميق ومعالجة اللغة والاسترجاع المعزز وأدوات تحليل البيانات.",
    siteDescriptionEn: "ML & Data Analyst | Deep Learning | NLP | RAG | CNN | Data Analysis",
    siteDescriptionAr: "محلل بيانات وذكاء اصطناعي | تعلم عميق | معالجة لغة | استرجاع معزز | تحليل بيانات",
    siteKeywords: ["data analyst", "AI", "machine learning", "deep learning", "NLP", "RAG", "Python", "Power BI"],
    ogTitleEn: "Abdelrahman Ahmed — ML & Data Analyst",
    ogTitleAr: "عبدالرحمن أحمد — محلل بيانات وذكاء اصطناعي",
    ogDescriptionEn: "Building machine learning and data solutions that drive real business impact.",
    ogDescriptionAr: "أبني حلول التعلم الآلي وتحليل البيانات التي تحدث أثراً حقيقياً.",
    defaultTheme: "dark",
    defaultLanguage: "en",
    sections: DEFAULT_SECTIONS.map((s, i) => ({ ...s, order: i + 1 })),
    analytics: { googleAnalyticsId: "", enabled: false },
    maintenanceMode: false,
    projectsDisplayMode: "grouped",
    footerTextEn: "© {year} Abdelrahman Ahmed. Built with data.",
    footerTextAr: "© {year} عبدالرحمن أحمد. مبني على البيانات."
  });

  const admin = await AdminCredential.create({
    username: "admin",
    passwordHash: await bcrypt.hash("changeme123", 12),
    mustChangePassword: true
  });

  const categories = await CategoryGroup.insertMany([
    { name: "Machine Learning & AI", slug: "machine-learning", description: "ML & AI projects", visible: true, sortOrder: 1 },
    { name: "Deep Learning & Computer Vision", slug: "deep-learning", description: "Deep learning & vision", visible: true, sortOrder: 2 },
    { name: "NLP & RAG", slug: "nlp-rag", description: "NLP and retrieval systems", visible: true, sortOrder: 3 },
    { name: "Data Analysis", slug: "data-analysis", description: "EDA & analytics", visible: true, sortOrder: 4 }
  ]);

  const projects = await Project.insertMany([
    {
      titleEn: "Manzil — AI Real Estate Valuation",
      titleAr: "منزل — تقييم عقاري بالذكاء الاصطناعي",
      slug: "manzil",
      shortSummaryEn: "AI-powered Egyptian real estate platform with LightGBM price prediction, SHAP explanations and a RAG assistant.",
      shortSummaryAr: "منصة عقارية مصرية مدعومة بالذكاء الاصطناعي مع توقع الأسعار وتفسيرات SHAP ومساعد استرجاع معزز.",
      executiveSummaryEn: "An AI real estate valuation and decision support system for the Egyptian market: LightGBM price prediction, confidence intervals, investment scoring, and a RAG-powered assistant (FAISS + BM25).",
      category: "Machine Learning & AI",
      problemStatementEn: "Property valuation in Egypt is subjective and inconsistent. Buyers and investors lack transparent, data-driven pricing tools.",
      businessObjectiveEn: "Deliver accurate, explainable property price predictions and investment insights to support buying and selling decisions.",
      datasetOverviewEn: "Clean Egyptian property data covering location, features, prices and market attributes.",
      technicalApproachEn: "LightGBM for pricing with SHAP explanations, confidence intervals, investment scoring, similar-property lookup, FAISS + BM25 RAG assistant, and a market analytics dashboard.",
      resultsEn: "End-to-end platform with explainable predictions and an interactive AI assistant, deployed live.",
      modelUsed: "LightGBM + SHAP + RAG (FAISS/BM25)",
      evaluationMetrics: ["R-squared", "SHAP values", "Confidence intervals"],
      tools: ["Python", "LightGBM", "SHAP", "Streamlit", "FAISS", "BM25", "React", "Next.js", "MongoDB"],
      githubLink: "https://github.com/AbdelGad0/manzil",
      liveDemoLink: "https://manzil-x7mu.onrender.com/",
      featured: true,
      featuredOnHomepage: true,
      homepageCategoryOrder: 1,
      visible: true,
      displayOrder: 1
    },
    {
      titleEn: "White Fang — RAG Assistant",
      titleAr: "الناب الأبيض — مساعد الاسترجاع المعزز",
      slug: "white-fang-rag",
      shortSummaryEn: "A RAG pipeline for Jack London's White Fang with hybrid search (BM25 + ChromaDB), cross-encoder reranking and a Streamlit UI.",
      shortSummaryAr: "خط أنابيب استرجاع معزز لرواية الناب الأبيض مع بحث هجين وإعادة ترتيب وواجهة Streamlit.",
      executiveSummaryEn: "Question-answering RAG assistant over the White Fang novel using sentence embeddings, hybrid BM25 + dense retrieval, cross-encoder reranking and Groq LLM generation.",
      category: "NLP & RAG",
      problemStatementEn: "Extracting accurate answers from a long novel requires precise retrieval from large unstructured text.",
      businessObjectiveEn: "Deliver a fast, context-aware reading assistant for large documents.",
      datasetOverviewEn: "Jack London's White Fang novel (PDF + cleaned text).",
      technicalApproachEn: "PDF extraction, sentence-based chunking with sliding window, all-MiniLM-L6-v2 embeddings, ChromaDB vector store, hybrid BM25 + dense search, cross-encoder reranking, and Llama 3.3 via Groq.",
      resultsEn: "Concise, context-aware answers with a dark arctic-themed Streamlit chat interface.",
      modelUsed: "all-MiniLM-L6-v2 + CrossEncoder + Llama 3.3 (Groq)",
      evaluationMetrics: ["Retrieval precision", "Answer relevance"],
      tools: ["Python", "ChromaDB", "Sentence Transformers", "rank_bm25", "Groq", "Streamlit"],
      githubLink: "https://github.com/AbdelGad0/white-fang-rag",
      featured: true,
      featuredOnHomepage: true,
      homepageCategoryOrder: 2,
      visible: true,
      displayOrder: 2
    },
    {
      titleEn: "AG News Classification System",
      titleAr: "نظام تصنيف الأخبار",
      slug: "ag-news-classifier",
      shortSummaryEn: "Classifies English news into World, Sports, Business and Sci/Tech using three NLP approaches, deployed as a Streamlit app.",
      shortSummaryAr: "يصنف الأخبار الإنجليزية إلى عالم ورياضة وأعمال وعلوم/تقنية باستخدام ثلاث طرق معالجة لغة، منشور كتطبيق Streamlit.",
      executiveSummaryEn: "A Streamlit web app classifying news articles into four categories comparing Naive Bayes (BoW & TF-IDF) and Logistic Regression with sentence embeddings.",
      category: "NLP & RAG",
      problemStatementEn: "Manually organizing hundreds of thousands of news articles by topic is infeasible.",
      businessObjectiveEn: "Automatically categorize news into four classes with high accuracy via NLP.",
      datasetOverviewEn: "AG News — 127,600 articles (120k train / 7.6k test) across 4 categories.",
      technicalApproachEn: "Bag of Words, TF-IDF, and 384-dim sentence embeddings (all-MiniLM-L6-v2) with Multinomial Naive Bayes and Logistic Regression.",
      resultsEn: "Best: Naive Bayes + BoW at 90.11% accuracy.",
      modelUsed: "Multinomial Naive Bayes + Logistic Regression",
      evaluationMetrics: ["Accuracy"],
      tools: ["Python", "Streamlit", "Scikit-learn", "NLTK", "Sentence Transformers", "Hugging Face"],
      githubLink: "https://github.com/AbdelGad0/ag-news-classifier",
      liveDemoLink: "https://ag-news-classifier-ebrijks9hr5wrdrg38ayuq.streamlit.app/",
      featured: true,
      featuredOnHomepage: true,
      homepageCategoryOrder: 3,
      visible: true,
      displayOrder: 3
    },
    {
      titleEn: "Breast Cancer Diagnostic Classification",
      titleAr: "تصنيف تشخيص سرطان الثدي",
      slug: "breast-cancer-classification",
      shortSummaryEn: "Classifies breast masses as Malignant or Benign with EDA, feature selection and four ML models (Random Forest best at 95.35%).",
      shortSummaryAr: "يصنف الكتل الثديية كخبيثة أو حميدة مع تحليل استكشافي واختيار ميزات وأربعة نماذج تعلم آلي.",
      executiveSummaryEn: "Exploratory analysis, feature selection and ML classification of the Wisconsin Diagnostic Breast Cancer dataset to diagnose tumors.",
      category: "Machine Learning & AI",
      problemStatementEn: "Early and accurate tumor diagnosis is critical yet challenging by manual inspection.",
      businessObjectiveEn: "Accurately classify tumor cells as malignant or benign to aid diagnosis.",
      datasetOverviewEn: "Wisconsin Diagnostic Breast Cancer dataset: 569 rows, 30 numeric features.",
      technicalApproachEn: "Data preprocessing, correlation analysis, feature selection (11 features), 85/15 train-test split, and evaluation of Random Forest, KNN, SVC and MLP with GridSearchCV tuning.",
      resultsEn: "Random Forest achieved 95.35% accuracy with precision 96.77% and recall 90.91%.",
      modelUsed: "Random Forest (best) + KNN + SVC + MLP",
      evaluationMetrics: ["Accuracy", "Precision", "Recall", "Confusion matrix"],
      tools: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
      githubLink: "https://github.com/AbdelGad0/Breast-Cancer-Diagnostic-Classification",
      featured: true,
      featuredOnHomepage: true,
      homepageCategoryOrder: 4,
      visible: true,
      displayOrder: 4
    },
    {
      titleEn: "Telco Customer Churn Analysis",
      titleAr: "تحليل تراجع عملاء الاتصالات",
      slug: "churn-analysis",
      shortSummaryEn: "Data-driven churn analysis of 7,043 telco customers identifying contract, payment and tenure as primary churn drivers.",
      shortSummaryAr: "تحليل قائم على البيانات لتراجع 7043 عميل اتصالات يحدد نوع العقد وطريقة الدفع ومدة الاشتراك كمحركات رئيسية للتراجع.",
      executiveSummaryEn: "Executive churn analysis on the Telco Customer Churn dataset with actionable insights and a retention action plan.",
      category: "Data Analysis",
      problemStatementEn: "26.54% of customers churn; the business lacks insight into what drives attrition.",
      businessObjectiveEn: "Identify churn drivers and recommend retention actions.",
      datasetOverviewEn: "7,043 customers, 1,869 churned (26.54%).",
      technicalApproachEn: "Statistical analysis exploring tenure, monthly charges, contract type, internet connection and payment method vs churn.",
      resultsEn: "Month-to-month contracts churn at 42.71%; electronic check users at 45.28%; fiber customers at 41.89%.",
      modelUsed: "Statistical / Exploratory Analysis",
      evaluationMetrics: ["Churn rate by segment", "Mean comparisons"],
      tools: ["Python", "Pandas", "Seaborn", "Scikit-learn"],
      githubLink: "https://github.com/AbdelGad0/ChurnAnalysis",
      featured: true,
      featuredOnHomepage: true,
      homepageCategoryOrder: 5,
      visible: true,
      displayOrder: 5
    },
    {
      titleEn: "Body Performance EDA & Classification",
      titleAr: "تحليل استكشافي لأداء الجسم",
      slug: "body-performance-eda",
      shortSummaryEn: "Comprehensive EDA and preprocessing of a 13,393-row body performance dataset to prepare for classification.",
      shortSummaryAr: "تحليل استكشافي شامل ومعالجة مسبقة لمجموعة بيانات أداء الجسم المكونة من 13393 صفاً تمهيداً للتصنيف.",
      executiveSummaryEn: "Exploratory data analysis of physical fitness and health variables with cleaning, outlier detection and distribution analysis for ML classification.",
      category: "Data Analysis",
      problemStatementEn: "Raw biometric and fitness data needs cleaning and analysis before reliable classification.",
      businessObjectiveEn: "Profile physical performance factors and prepare clean data for ML models.",
      datasetOverviewEn: "13,393 rows, 12 columns covering age, gender, biometrics and fitness metrics.",
      technicalApproachEn: "Missing/duplicate checks, validity and outlier detection, univariate and distribution analysis with Pandas, Matplotlib, Seaborn and Plotly.",
      resultsEn: "Clean, well-understood dataset ready for classification.",
      modelUsed: "EDA / Preprocessing",
      evaluationMetrics: ["Data quality", "Distribution statistics"],
      tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"],
      githubLink: "https://github.com/AbdelGad0/bodyPerformance-EDA",
      featured: false,
      featuredOnHomepage: false,
      visible: true,
      displayOrder: 6
    },
    {
      titleEn: "Industrial Casting Defect Detection (CNN)",
      titleAr: "كشف عيوب السباكة الصناعية",
      slug: "ind-classif",
      shortSummaryEn: "Custom PyTorch CNN built from scratch to classify industrial casting images as Defective or OK.",
      shortSummaryAr: "شبكة عصبية ملتفة مبنية من الصفر باستخدام PyTorch لتصنيف صور السباكة الصناعية كمعيبة أو سليمة.",
      executiveSummaryEn: "A custom three-block CNN in PyTorch that detects defects in industrial casting product images, with training, evaluation and a Tkinter GUI.",
      category: "Deep Learning & Computer Vision",
      problemStatementEn: "Manual visual inspection of casting products is slow and error-prone.",
      businessObjectiveEn: "Automatically flag defective casting parts with high precision.",
      datasetOverviewEn: "Casting defect image dataset (train/test split: def_front / ok_front).",
      technicalApproachEn: "Three Conv2D-ReLU-MaxPool blocks, flattening, dropout classifier with BCEWithLogitsLoss, 20 epochs training and metrics reporting.",
      resultsEn: "Trained model with reported test accuracy, precision, recall, F1 and confusion matrix plus saved visualizations.",
      modelUsed: "Custom CNN (PyTorch)",
      evaluationMetrics: ["Accuracy", "Precision", "Recall", "F1", "Confusion matrix"],
      tools: ["Python", "PyTorch", "Tkinter"],
      githubLink: "https://github.com/AbdelGad0/IND-Classif",
      featured: false,
      featuredOnHomepage: false,
      visible: true,
      displayOrder: 7
    },
    {
      titleEn: "Titanic — Data Cleaning & Prediction",
      titleAr: "تيتانيك — تنظيف البيانات والتنبؤ",
      slug: "titanic-data-set",
      shortSummaryEn: "Data cleaning and survival prediction on the Titanic dataset.",
      shortSummaryAr: "تنظيف البيانات والتنبؤ بالنجاة على مجموعة بيانات تيتانيك.",
      executiveSummaryEn: "Clean and predict survival on the classic Titanic dataset.",
      category: "Data Analysis",
      problemStatementEn: "Raw Titanic data requires cleaning before building a survival model.",
      businessObjectiveEn: "Produce a clean dataset and baseline survival predictions.",
      datasetOverviewEn: "Titanic passenger dataset.",
      technicalApproachEn: "Data cleaning, preprocessing and predictive modeling.",
      resultsEn: "Cleaned dataset with survival predictions.",
      modelUsed: "Classification model",
      evaluationMetrics: ["Accuracy"],
      tools: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
      githubLink: "https://github.com/AbdelGad0/Titanic-Data-Set",
      featured: false,
      featuredOnHomepage: false,
      visible: true,
      displayOrder: 8
    }
  ]);

  const skillCategories = await SkillCategory.insertMany([
    { nameEn: "Programming & Data", nameAr: "البرمجة والبيانات", slug: "programming-data", icon: "Code2", visible: true, sortOrder: 1 },
    { nameEn: "Machine Learning / AI", nameAr: "التعلم الآلي والذكاء الاصطناعي", slug: "machine-learning", icon: "Brain", visible: true, sortOrder: 2 },
    { nameEn: "Data Visualization", nameAr: "تصور البيانات", slug: "data-visualization", icon: "BarChart3", visible: true, sortOrder: 3 },
    { nameEn: "Tools", nameAr: "الأدوات", slug: "tools", icon: "Wrench", visible: true, sortOrder: 4 },
    { nameEn: "Web Development", nameAr: "تطوير الويب", slug: "web-development", icon: "Globe", visible: true, sortOrder: 5 }
  ]);

  const skills = await Skill.insertMany([
    { nameEn: "Python", nameAr: "بايثون", category: "programming-data", level: "Expert", visible: true, order: 1 },
    { nameEn: "Pandas", category: "programming-data", level: "Advanced", visible: true, order: 2 },
    { nameEn: "NumPy", category: "programming-data", level: "Advanced", visible: true, order: 3 },
    { nameEn: "Matplotlib", category: "programming-data", level: "Advanced", visible: true, order: 4 },
    { nameEn: "Seaborn", category: "programming-data", level: "Advanced", visible: true, order: 5 },
    { nameEn: "Data Cleaning & Preprocessing", nameAr: "تنظيف البيانات والمعالجة المسبقة", category: "programming-data", level: "Advanced", visible: true, order: 6 },
    { nameEn: "Exploratory Data Analysis (EDA)", nameAr: "التحليل الاستكشافي للبيانات", category: "programming-data", level: "Advanced", visible: true, order: 7 },
    { nameEn: "Statistical Analysis", nameAr: "التحليل الإحصائي", category: "programming-data", level: "Intermediate", visible: true, order: 8 },
    { nameEn: "Machine Learning Fundamentals", nameAr: "أساسيات التعلم الآلي", category: "machine-learning", level: "Advanced", visible: true, order: 1 },
    { nameEn: "Deep Learning", nameAr: "التعلم العميق", category: "machine-learning", level: "Advanced", visible: true, order: 2 },
    { nameEn: "NLP", nameAr: "معالجة اللغة الطبيعية", category: "machine-learning", level: "Advanced", visible: true, order: 3 },
    { nameEn: "RAG", nameAr: "الاسترجاع المعزز", category: "machine-learning", level: "Advanced", visible: true, order: 4 },
    { nameEn: "CNN", nameAr: "الشبكات العصبية الملتفة", category: "machine-learning", level: "Advanced", visible: true, order: 5 },
    { nameEn: "Object Detection", nameAr: "كشف الأجسام", category: "machine-learning", level: "Intermediate", visible: true, order: 6 },
    { nameEn: "YOLO", category: "machine-learning", level: "Intermediate", visible: true, order: 7 },
    { nameEn: "Scikit-learn", category: "machine-learning", level: "Advanced", visible: true, order: 8 },
    { nameEn: "XGBoost", category: "machine-learning", level: "Intermediate", visible: true, order: 9 },
    { nameEn: "CatBoost", category: "machine-learning", level: "Intermediate", visible: true, order: 10 },
    { nameEn: "TensorFlow / Keras", category: "machine-learning", level: "Advanced", visible: true, order: 11 },
    { nameEn: "PyTorch", category: "machine-learning", level: "Advanced", visible: true, order: 12 },
    { nameEn: "Sentence Transformers", category: "machine-learning", level: "Advanced", visible: true, order: 13 },
    { nameEn: "BM25", category: "machine-learning", level: "Advanced", visible: true, order: 14 },
    { nameEn: "Power BI", category: "data-visualization", level: "Advanced", visible: true, order: 1 },
    { nameEn: "Excel", nameAr: "إكسل", category: "data-visualization", level: "Advanced", visible: true, order: 2 },
    { nameEn: "Power Query / Excel Automation", category: "data-visualization", level: "Advanced", visible: true, order: 3 },
    { nameEn: "Jupyter Notebook", category: "tools", level: "Advanced", visible: true, order: 1 },
    { nameEn: "Google Colab", category: "tools", level: "Advanced", visible: true, order: 2 },
    { nameEn: "Kaggle", category: "tools", level: "Intermediate", visible: true, order: 3 },
    { nameEn: "Git / GitHub", category: "tools", level: "Advanced", visible: true, order: 4 },
    { nameEn: "VS Code", category: "tools", level: "Advanced", visible: true, order: 5 },
    { nameEn: "Ollama", category: "tools", level: "Intermediate", visible: true, order: 6 },
    { nameEn: "ChromaDB", category: "tools", level: "Advanced", visible: true, order: 7 },
    { nameEn: "MongoDB", category: "tools", level: "Intermediate", visible: true, order: 8 },
    { nameEn: "Docker", category: "tools", level: "Intermediate", visible: true, order: 9 },
    { nameEn: "HTML / CSS / JavaScript", category: "web-development", level: "Advanced", visible: true, order: 1 },
    { nameEn: "React / Next.js", category: "web-development", level: "Advanced", visible: true, order: 2 },
    { nameEn: "WordPress", category: "web-development", level: "Advanced", visible: true, order: 3 }
  ]);

  const experiences = await Experience.insertMany([
    {
      titleEn: "Freelance AI & Data Analyst",
      titleAr: "محلل بيانات وذكاء اصطناعي مستقل",
      companyEn: "Freelance",
      companyAr: "عمل حر",
      durationEn: "2020 — Present",
      durationAr: "2020 — حتى الآن",
      bulletsEn: [
        "Developed data analysis and machine learning solutions using Python and Scikit-learn.",
        "Performed data cleaning, exploratory data analysis (EDA), statistical analysis, and visualization.",
        "Built AI projects involving NLP, RAG, text classification, and computer vision.",
        "Developed data-driven automation solutions using Python, Excel, Power BI, and related tools."
      ],
      bulletsAr: [
        "تطوير حلول تحليل البيانات والتعلم الآلي باستخدام بايثون وScikit-learn.",
        "تنفيذ تنظيف البيانات والتحليل الاستكشافي والتحليل الإحصائي والتصور.",
        "بناء مشاريع ذكاء اصطناعي تشمل معالجة اللغة والاسترجاع المعزز وتصنيف النصوص ورؤية الحاسوب.",
        "تطوير حلول أتمتة تعتمد على البيانات باستخدام بايثون وإكسل وPower BI وأدوات ذات صلة."
      ],
      tools: ["Python", "Scikit-learn", "Power BI", "TensorFlow", "Excel"],
      current: true,
      visible: true,
      order: 1
    },
    {
      titleEn: "Freelance Web Developer",
      titleAr: "مطور ويب مستقل",
      companyEn: "Freelance",
      companyAr: "عمل حر",
      durationEn: "2020 — Present",
      durationAr: "2020 — حتى الآن",
      bulletsEn: [
        "Developed responsive websites and web applications based on client requirements.",
        "Built and customized websites using modern web technologies and WordPress.",
        "Integrated APIs, databases, and third-party services into web applications.",
        "Delivered customized web solutions with a focus on performance, usability, and responsive design."
      ],
      bulletsAr: [
        "تطوير مواقع وتطبيقات ويب متجاوبة بناءً على متطلبات العملاء.",
        "بناء وتخصيص المواقع باستخدام تقنيات ويب حديثة وWordPress.",
        "دمج الواجهات البرمجية وقواعد البيانات والخدمات الخارجية في التطبيقات.",
        "تقديم حلول ويب مخصصة مع التركيز على الأداء وسهولة الاستخدام والتصميم المتجاوب."
      ],
      tools: ["HTML/CSS", "JavaScript", "React", "Next.js", "WordPress"],
      current: true,
      visible: true,
      order: 2
    }
  ]);

  const educations = await Education.insertMany([
    {
      degreeEn: "Bachelor's Degree",
      degreeAr: "درجة البكالوريوس",
      institutionEn: "Al-Azhar University",
      institutionAr: "جامعة الأزهر",
      fieldOfStudyEn: "Islamic and Arabic Studies",
      fieldOfStudyAr: "الدراسات الإسلامية والعربية",
      startDate: "2019",
      endDate: "2023",
      descriptionEn: "Bachelor's degree in Islamic and Arabic Studies.",
      descriptionAr: "درجة بكالوريوس في الدراسات الإسلامية والعربية.",
      visible: true,
      order: 1
    }
  ]);

  const certifications = await Certification.insertMany([
    {
      nameEn: "PL-300: Microsoft Power BI Data Analyst",
      nameAr: "PL-300: محلل بيانات باور بي آي",
      issuer: "Microsoft",
      date: "",
      descriptionEn: "Microsoft Power BI Data Analyst Associate certification.",
      descriptionAr: "شهادة محلل بيانات باور بي آي من مايكروسوفت.",
      credentialUrl: "https://1drv.ms/i/c/d5d4f571c00bba51/IQDRGzp8kJ4BQZe1lEWzjAnjATMzGg7SclFBA8qlfah-Mdg?e=nWejEF",
      featured: true,
      visible: true,
      order: 1
    },
    {
      nameEn: "Data Analyst Level 1",
      nameAr: "محلل بيانات المستوى الأول",
      issuer: "DataCamp",
      date: "",
      descriptionEn: "Data Analyst certification — Level 1.",
      descriptionAr: "شهادة محلل بيانات — المستوى الأول.",
      credentialUrl: "https://1drv.ms/b/c/d5d4f571c00bba51/IQD-CIVoEvtmRYdxFiy0-HURAS_GIrOFzS4ciNeTif7RwZM?e=FM51wA",
      featured: false,
      visible: true,
      order: 2
    },
    {
      nameEn: "Data Analyst Level 2",
      nameAr: "محلل بيانات المستوى الثاني",
      issuer: "DataCamp",
      date: "",
      descriptionEn: "Data Analyst certification — Level 2.",
      descriptionAr: "شهادة محلل بيانات — المستوى الثاني.",
      credentialUrl: "https://1drv.ms/b/c/d5d4f571c00bba51/IQA-HBnpD6uJQLZOP-AZzWmxAR5pZ3XWWnS7qy_AaUu04WY?e=r73skq",
      featured: false,
      visible: true,
      order: 3
    }
  ]);

  return NextResponse.json({
    success: true,
    seeded: {
      profile: 1,
      theme: 1,
      settings: 1,
      admin: 1,
      categories: categories.length,
      projects: projects.length,
      skillCategories: skillCategories.length,
      skills: skills.length,
      experiences: experiences.length,
      educations: educations.length,
      certifications: certifications.length
    }
  });
}
