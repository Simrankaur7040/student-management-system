import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Edit3, Trash2, X, User, Mail, Phone, BookOpen, MapPin, ChevronDown, GraduationCap, Users, AlertCircle, Check, Loader2, ArrowRight, Home, BarChart3, Shield, Clock } from "lucide-react";

const API_BASE = "http://localhost:8080/api/students";

const DEPARTMENTS = [
  "Computer Science", "Electronics", "Mechanical",
  "Civil", "Electrical", "Information Technology",
  "Chemical", "Biotechnology"
];

const EMPTY_FORM = {
  firstName: "", lastName: "", email: "",
  department: "", year: 1, phoneNumber: "", address: ""
};

// ─── Toast Notification ───
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  const colors = {
    success: "bg-emerald-600", error: "bg-red-500", info: "bg-sky-500"
  };
  return (
    <div className={`fixed top-6 right-6 z-50 ${colors[type]} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3`}
         style={{ animation: "slideIn .3s ease-out", fontFamily: "'DM Sans', sans-serif" }}>
      {type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

// ─── Home Page ───
function HomePage({ onEnter }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-red-700/30" style={{ background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/chitkara-logo.png" alt="Chitkara University" className="h-12 w-auto rounded-lg bg-white p-1" />
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Chitkara University
              </h1>
              <p className="text-[11px] text-red-200 font-medium tracking-wide uppercase">Student Management System</p>
            </div>
          </div>
          <button onClick={onEnter}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5">
            Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6" style={{ background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center pt-16">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/30 mb-8"
               style={{ animation: "float 3s ease-in-out infinite" }}>
            <GraduationCap size={48} className="text-white" />
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Student Management<br />
            <span className="text-red-600">Made Simple</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
            A complete solution to manage student records efficiently. Add, edit, search, and organize student data with ease.
          </p>
          <button onClick={onEnter}
                  className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-500/30 hover:-translate-y-1 hover:shadow-red-500/40">
            Get Started <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Choose Our System?
          </h3>
          <p className="text-center text-gray-500 mb-14 max-w-lg mx-auto">
            Built with modern technologies for a seamless experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Student Records", desc: "Manage complete student profiles with personal and academic details", color: "from-red-500 to-rose-600", bg: "bg-red-50" },
              { icon: BarChart3, title: "Department Filter", desc: "Filter and search students by department, name, or email instantly", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
              { icon: Shield, title: "Data Validation", desc: "Built-in validation ensures accurate and complete student data entry", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
              { icon: Clock, title: "Real-time Updates", desc: "All changes sync instantly between the frontend and MySQL database", color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
            ].map((feature, i) => (
              <div key={i} className={`${feature.bg} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                   style={{ animation: `fadeUp .5s ease-out ${i * 0.1}s both` }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 px-6" style={{ background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Built With Modern Technologies
          </h3>
          <p className="text-gray-500 mb-14 max-w-lg mx-auto">
            Powered by industry-standard tools and frameworks
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Spring Boot", desc: "Backend Framework", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
              { name: "React", desc: "Frontend Library", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
              { name: "MySQL", desc: "Database", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
              { name: "Tailwind CSS", desc: "Styling", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
            ].map((tech, i) => (
              <div key={i} className={`${tech.bg} ${tech.border} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
                   style={{ animation: `fadeUp .5s ease-out ${i * 0.1}s both` }}>
                <h4 className={`text-xl font-bold ${tech.color} mb-1`}>{tech.name}</h4>
                <p className="text-sm text-gray-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center rounded-3xl p-12" style={{ background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)" }}>
          <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Manage Students?
          </h3>
          <p className="text-red-100 mb-8 max-w-md mx-auto">
            Access the dashboard to start adding, editing, and managing student records.
          </p>
          <button onClick={onEnter}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all shadow-xl mx-auto hover:-translate-y-1">
            Open Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/chitkara-logo.png" alt="Chitkara" className="h-8 w-auto rounded bg-white" />
            <span className="text-sm font-semibold text-gray-700">Chitkara University</span>
          </div>
          <p className="text-sm text-gray-400">Student Management System — Built with Spring Boot & React</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Modal ───
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center"
         style={{ animation: "fadeIn .2s ease-out" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
           style={{ animation: "scaleIn .25s ease-out", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Input Field ───
function Field({ icon: Icon, label, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500/10 ${error ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50"}`}>
        {Icon && <Icon size={18} className="text-gray-400 flex-shrink-0" />}
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// ─── Student Form ───
function StudentForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: null }));
  };
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.department) e.department = "Select a department";
    if (form.year < 1 || form.year > 6) e.year = "Year must be 1-6";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = () => { if (validate()) onSubmit(form); };
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <Field icon={User} label="First Name" error={errors.firstName}>
          <input className="w-full bg-transparent outline-none text-gray-900 text-sm" placeholder="John"
                 value={form.firstName} onChange={e => set("firstName", e.target.value)} />
        </Field>
        <Field icon={User} label="Last Name" error={errors.lastName}>
          <input className="w-full bg-transparent outline-none text-gray-900 text-sm" placeholder="Doe"
                 value={form.lastName} onChange={e => set("lastName", e.target.value)} />
        </Field>
      </div>
      <Field icon={Mail} label="Email" error={errors.email}>
        <input className="w-full bg-transparent outline-none text-gray-900 text-sm" placeholder="john@example.com" type="email"
               value={form.email} onChange={e => set("email", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-x-4">
        <Field icon={BookOpen} label="Department" error={errors.department}>
          <select className="w-full bg-transparent outline-none text-gray-900 text-sm appearance-none cursor-pointer"
                  value={form.department} onChange={e => set("department", e.target.value)}>
            <option value="">Select...</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        </Field>
        <Field icon={GraduationCap} label="Year" error={errors.year}>
          <input className="w-full bg-transparent outline-none text-gray-900 text-sm" type="number" min="1" max="6"
                 value={form.year} onChange={e => set("year", parseInt(e.target.value) || 1)} />
        </Field>
      </div>
      <Field icon={Phone} label="Phone (optional)">
        <input className="w-full bg-transparent outline-none text-gray-900 text-sm" placeholder="+91 98765 43210"
               value={form.phoneNumber} onChange={e => set("phoneNumber", e.target.value)} />
      </Field>
      <Field icon={MapPin} label="Address (optional)">
        <input className="w-full bg-transparent outline-none text-gray-900 text-sm" placeholder="123 Main St, City"
               value={form.address} onChange={e => set("address", e.target.value)} />
      </Field>
      <div className="flex gap-3 mt-6">
        <button onClick={onCancel}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {initial ? "Update Student" : "Add Student"}
        </button>
      </div>
    </div>
  );
}

// ─── Student Card ───
function StudentCard({ student, onEdit, onDelete, index }) {
  const initials = (student.firstName[0] + student.lastName[0]).toUpperCase();
  const colors = [
    "from-red-500 to-rose-600", "from-sky-500 to-blue-600",
    "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600", "from-cyan-500 to-sky-600"
  ];
  const gradient = colors[student.id % colors.length];
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 overflow-hidden"
         style={{ animation: `fadeUp .4s ease-out ${index * 0.05}s both` }}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-gray-500 truncate">{student.email}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(student)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
              <Edit3 size={16} />
            </button>
            <button onClick={() => onDelete(student.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">
            {student.department}
          </span>
          <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold">
            Year {student.year}
          </span>
          {student.phoneNumber && (
            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center gap-1">
              <Phone size={12} /> {student.phoneNumber}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation ───
function DeleteConfirm({ open, onClose, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ animation: "fadeIn .2s ease-out" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center"
           style={{ animation: "scaleIn .25s ease-out", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Student?</h3>
        <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The student record will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard (Student Management) ───
function Dashboard({ onBack }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [useMock, setUseMock] = useState(false);
  const [mockId, setMockId] = useState(6);
  const MOCK_DATA = [
    { id: 1, firstName: "Aarav", lastName: "Sharma", email: "aarav@example.com", department: "Computer Science", year: 3, phoneNumber: "+91 98765 43210", address: "Chandigarh" },
    { id: 2, firstName: "Priya", lastName: "Patel", email: "priya@example.com", department: "Electronics", year: 2, phoneNumber: "+91 87654 32109", address: "Mumbai" },
    { id: 3, firstName: "Rohan", lastName: "Singh", email: "rohan@example.com", department: "Mechanical", year: 4, phoneNumber: "", address: "Delhi" },
    { id: 4, firstName: "Ananya", lastName: "Gupta", email: "ananya@example.com", department: "Computer Science", year: 1, phoneNumber: "+91 76543 21098", address: "Bangalore" },
    { id: 5, firstName: "Vikram", lastName: "Kumar", email: "vikram@example.com", department: "Civil", year: 3, phoneNumber: "", address: "Pune" },
  ];
  const showToast = (message, type = "success") => setToast({ message, type });
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error();
      setStudents(await res.json());
      setUseMock(false);
    } catch {
      setStudents(MOCK_DATA);
      setUseMock(true);
    }
    setLoading(false);
  }, []);
  useEffect(() => { fetchStudents(); }, [fetchStudents]);
  const handleCreate = async (data) => {
    setActionLoading(true);
    try {
      if (useMock) {
        const newId = mockId;
        setMockId(prev => prev + 1);
        setStudents(prev => [...prev, { ...data, id: newId }]);
      } else {
        const res = await fetch(API_BASE, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        await fetchStudents();
      }
      setModalOpen(false);
      showToast("Student added successfully!");
    } catch { showToast("Failed to add student", "error"); }
    setActionLoading(false);
  };
  const handleUpdate = async (data) => {
    setActionLoading(true);
    try {
      if (useMock) {
        setStudents(prev => prev.map(s => s.id === editStudent.id ? { ...data, id: editStudent.id } : s));
      } else {
        const res = await fetch(`${API_BASE}/${editStudent.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        await fetchStudents();
      }
      setEditStudent(null);
      setModalOpen(false);
      showToast("Student updated successfully!");
    } catch { showToast("Failed to update student", "error"); }
    setActionLoading(false);
  };
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      if (useMock) {
        setStudents(prev => prev.filter(s => s.id !== deleteId));
      } else {
        const res = await fetch(`${API_BASE}/${deleteId}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        await fetchStudents();
      }
      setDeleteId(null);
      showToast("Student deleted successfully!");
    } catch { showToast("Failed to delete student", "error"); }
    setActionLoading(false);
  };
  const filtered = students.filter(s => {
    const matchSearch = !search || `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || s.department === filterDept;
    return matchSearch && matchDept;
  });
  const deptCounts = students.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "linear-gradient(145deg, #fff5f5 0%, #fef2f2 30%, #f0fdf4 70%, #fefce8 100%)" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30 border-b border-red-700/30" style={{ background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors mr-1">
              <Home size={20} />
            </button>
            <img src="/chitkara-logo.png" alt="Chitkara University" className="h-12 w-auto rounded-lg bg-white p-1" />
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Chitkara University
              </h1>
              <p className="text-[11px] text-red-200 font-medium tracking-wide uppercase">Student Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {useMock && (
              <span className="px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/30">
                Demo Mode
              </span>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
              <Users size={16} className="text-white" />
              <span className="text-sm font-bold text-white">{students.length}</span>
              <span className="text-xs text-red-100 font-medium">Students</span>
            </div>
            <button onClick={() => { setEditStudent(null); setModalOpen(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5">
              <Plus size={18} /> Add Student
            </button>
          </div>
        </div>
      </header>
      {/* ─── Filters ─── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[280px] flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500/10 transition-all">
            <Search size={18} className="text-gray-400" />
            <input className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                   placeholder="Search students by name or email..."
                   value={search} onChange={e => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch("")} className="p-1 rounded-full hover:bg-gray-100">
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
            <BookOpen size={18} className="text-gray-400" />
            <select className="bg-transparent outline-none text-sm text-gray-700 appearance-none cursor-pointer pr-2"
                    value={filterDept} onChange={e => setFilterDept(e.target.value)}>
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d} {deptCounts[d] ? `(${deptCounts[d]})` : ""}</option>
              ))}
            </select>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
      {/* ─── Student Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="animate-spin text-red-500 mb-4" />
            <p className="text-gray-500 text-sm">Loading students...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24" style={{ animation: "fadeIn .5s ease-out" }}>
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Users size={36} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400 mb-1">
              {search || filterDept ? "No matching students" : "No students yet"}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              {search || filterDept ? "Try adjusting your filters" : "Add your first student to get started"}
            </p>
            {!search && !filterDept && (
              <button onClick={() => { setEditStudent(null); setModalOpen(true); }}
                      className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-500/25">
                <Plus size={18} className="inline mr-2" /> Add First Student
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-medium mb-4">
              Showing {filtered.length} of {students.length} students
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s, i) => (
                <StudentCard key={s.id} student={s} index={i}
                            onEdit={(st) => { setEditStudent(st); setModalOpen(true); }}
                            onDelete={(id) => setDeleteId(id)} />
              ))}
            </div>
          </>
        )}
      </div>
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditStudent(null); }}
             title={editStudent ? "Edit Student" : "Add New Student"}>
        <StudentForm
          initial={editStudent}
          onSubmit={editStudent ? handleUpdate : handleCreate}
          onCancel={() => { setModalOpen(false); setEditStudent(null); }}
          loading={actionLoading}
        />
      </Modal>
      <DeleteConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={actionLoading} />
    </div>
  );
}

// ─── Main App (Router) ───
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-6px) } }
      `}</style>
      {page === "home" ? (
        <HomePage onEnter={() => setPage("dashboard")} />
      ) : (
        <Dashboard onBack={() => setPage("home")} />
      )}
    </>
  );
}