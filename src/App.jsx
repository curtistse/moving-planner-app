import React, { useState } from 'react';
import { Check, Package, DollarSign, Users, Trash2, Download, Calendar, MapPin, ChevronDown, ChevronUp, Plus, X, Pencil, ArrowDownUp, ChevronsUpDown, List, GanttChart } from 'lucide-react';

const initialTasks = [
  // HIRE category
  { id: 1, category: 'hire', task: 'Book movers', deadline: '2026-01-24', notes: 'Get quotes from 3+ companies. Ask about weekday vs weekend rates.', priority: 'high', completed: false },
  { id: 2, category: 'hire', task: 'Order Frogbox containers', deadline: '2026-01-27', notes: 'Schedule delivery ~1 week before move. Confirm pickup date.', priority: 'high', completed: false },
  { id: 3, category: 'hire', task: 'Hire electrician', deadline: '2026-01-31', notes: 'Remove dining room lights. Get quote for removal.', priority: 'medium', completed: false },
  { id: 4, category: 'hire', task: 'Book cleaner for old place', deadline: '2026-02-06', notes: '5 Hanna Avenue - schedule for move-out day or day after', priority: 'medium', completed: false },
  { id: 5, category: 'hire', task: 'Book cleaner for new place', deadline: '2026-02-03', notes: '33 Harbour Square - schedule BEFORE move-in', priority: 'medium', completed: false },
  { id: 6, category: 'hire', task: 'Hire painter for new place', deadline: '2026-01-20', notes: '33 Harbour Square - must complete before move-in. Get quotes.', priority: 'high', completed: false },
  
  // SELL category
  { id: 7, category: 'sell', task: 'List dining room lights', deadline: '2026-01-10', notes: 'Facebook Marketplace, Kijiji. Take good photos.', priority: 'medium', completed: false },
  { id: 8, category: 'sell', task: 'List TV stand', deadline: '2026-01-10', notes: 'Measure dimensions for listing', priority: 'low', completed: false },
  { id: 9, category: 'sell', task: 'List dining table', deadline: '2026-01-10', notes: 'Table only or with chairs - price both options', priority: 'medium', completed: false },
  { id: 10, category: 'sell', task: 'List dining chairs (optional)', deadline: '2026-01-17', notes: 'Can keep if no buyers. Bundle with table?', priority: 'low', completed: false },
  { id: 11, category: 'sell', task: 'List shoe rack', deadline: '2026-01-10', notes: '', priority: 'low', completed: false },
  { id: 12, category: 'sell', task: 'List patio furniture', deadline: '2026-01-10', notes: 'Good time to sell before spring demand', priority: 'medium', completed: false },
  
  // MOVE/PACK category
  { id: 13, category: 'move', task: 'Pack books & non-essentials', deadline: '2026-01-27', notes: 'First things to go in Frogboxes', priority: 'medium', completed: false },
  { id: 14, category: 'move', task: 'Pack kitchen items', deadline: '2026-02-03', notes: 'Keep essentials out until last 2 days', priority: 'medium', completed: false },
  { id: 15, category: 'move', task: 'Pack clothes & linens', deadline: '2026-02-05', notes: '', priority: 'medium', completed: false },
  { id: 16, category: 'move', task: 'Prep plants for move', deadline: '2026-02-06', notes: '3 plants - water day before, wrap pots', priority: 'low', completed: false },
  { id: 17, category: 'move', task: 'Disassemble standing desk', deadline: '2026-02-06', notes: 'Keep hardware in labeled bag', priority: 'medium', completed: false },
  { id: 18, category: 'move', task: 'Disassemble bed frame', deadline: '2026-02-07', notes: 'Morning of move day', priority: 'high', completed: false },
  { id: 19, category: 'move', task: 'Unmount TV', deadline: '2026-02-06', notes: 'Keep mounting hardware. Original box if available.', priority: 'medium', completed: false },
  { id: 20, category: 'move', task: 'Pack laptops & electronics', deadline: '2026-02-07', notes: '2 laptops - carry personally, don\'t put in moving truck', priority: 'high', completed: false },
  { id: 21, category: 'move', task: 'Wrap mattress', deadline: '2026-02-07', notes: 'Mattress bag from movers or buy separately', priority: 'medium', completed: false },
  { id: 22, category: 'move', task: 'Protect Knoll chair', deadline: '2026-02-07', notes: 'Wrap arms and base. High-value item.', priority: 'medium', completed: false },
  
  // TOSS category
  { id: 23, category: 'toss', task: 'Dispose of dead patio plant', deadline: '2026-01-15', notes: 'Compost or green bin', priority: 'low', completed: false },
  
  // ADMIN category
  { id: 24, category: 'admin', task: 'Update address with Canada Post', deadline: '2026-02-01', notes: 'Set up mail forwarding', priority: 'high', completed: false },
  { id: 25, category: 'admin', task: 'Notify utilities', deadline: '2026-02-01', notes: 'Hydro, internet, etc.', priority: 'high', completed: false },
  { id: 26, category: 'admin', task: 'Update address with bank', deadline: '2026-02-10', notes: '', priority: 'medium', completed: false },
  { id: 27, category: 'admin', task: 'Get building access/keys', deadline: '2026-02-06', notes: '33 Harbour Square - coordinate with property manager', priority: 'high', completed: false },
  { id: 28, category: 'admin', task: 'Book elevator for move-in', deadline: '2026-01-24', notes: '33 Harbour Square - condos often require this', priority: 'high', completed: false },
  { id: 29, category: 'admin', task: 'Book elevator for move-out', deadline: '2026-01-24', notes: '5 Hanna Avenue - check if required', priority: 'medium', completed: false },
];

const categoryConfig = {
  hire: { label: 'Hire Services', icon: Users, color: '#5B8C5A', bg: '#E8F0E8' },
  sell: { label: 'Sell Items', icon: DollarSign, color: '#C4A962', bg: '#FDF6E3' },
  move: { label: 'Pack & Move', icon: Package, color: '#6B8CAE', bg: '#E8EEF4' },
  toss: { label: 'Dispose', icon: Trash2, color: '#A67C7C', bg: '#F4E8E8' },
  admin: { label: 'Admin Tasks', icon: Calendar, color: '#8B7BA6', bg: '#F0EBF4' },
};

const priorityColors = {
  high: '#D64545',
  medium: '#D4A84B',
  low: '#7A9E7A',
};

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(categoryConfig).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );
  const [categorySortBy, setCategorySortBy] = useState(
    Object.keys(categoryConfig).reduce((acc, key) => ({ ...acc, [key]: 'deadline' }), {})
  );
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    task: '',
    category: 'move',
    deadline: '2026-02-01',
    priority: 'medium',
    notes: ''
  });

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleAllCategories = () => {
    const allExpanded = Object.values(expandedCategories).every(v => v);
    const newState = Object.keys(categoryConfig).reduce((acc, key) => ({ ...acc, [key]: !allExpanded }), {});
    setExpandedCategories(newState);
  };

  const allExpanded = Object.values(expandedCategories).every(v => v);

  const addTask = () => {
    if (!newTask.task.trim()) return;
    const task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      ...newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({
      task: '',
      category: 'move',
      deadline: '2026-02-01',
      priority: 'medium',
      notes: ''
    });
    setShowAddModal(false);
  };

  const startEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const updateTask = () => {
    if (!editingTask.task.trim()) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setEditingTask(null);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks
    .filter(t => filter === 'all' || t.category === filter);

  const sortTasks = (tasksToSort, sortType) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortType === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      if (sortType === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    });
  };

  const groupedTasks = Object.keys(categoryConfig).reduce((acc, cat) => {
    const catTasks = filteredTasks.filter(t => t.category === cat);
    acc[cat] = sortTasks(catTasks, categorySortBy[cat]);
    return acc;
  }, {});

  const exportToCSV = () => {
    const headers = ['Task', 'Category', 'Deadline', 'Priority', 'Notes', 'Status'];
    const rows = tasks.map(t => [
      t.task,
      categoryConfig[t.category].label,
      t.deadline,
      t.priority,
      t.notes,
      t.completed ? 'Done' : 'To Do'
    ]);
    
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moving-plan-toronto.csv';
    a.click();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateStr) => {
    const today = new Date('2025-12-23');
    const deadline = new Date(dateStr);
    const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F7F5F0 0%, #EDE9E0 100%)',
      fontFamily: '"Source Serif 4", Georgia, serif',
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600&display=swap');
        
        * { box-sizing: border-box; }
        
        .task-row:hover { background: rgba(0,0,0,0.02); }
        .task-row:hover .edit-btn { opacity: 1; }
        .edit-btn { opacity: 0; transition: opacity 0.2s ease; }
        .edit-btn:hover { background: rgba(0,0,0,0.05); }
        .checkbox { transition: all 0.2s ease; }
        .checkbox:hover { transform: scale(1.1); }
        .category-header:hover { background: rgba(0,0,0,0.02); }
        .export-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <MapPin size={28} style={{ color: '#6B8CAE' }} />
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#2C3E50',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              Toronto Move Planner
            </h1>
          </div>
          <p style={{ 
            fontFamily: '"DM Sans", sans-serif',
            color: '#666',
            fontSize: '15px',
            margin: '8px 0 0 0'
          }}>
            5 Hanna Avenue → 33 Harbour Square · Target: Feb 7-9, 2026
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ 
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: '600',
              color: '#2C3E50',
              fontSize: '14px'
            }}>
              Overall Progress
            </span>
            <span style={{ 
              fontFamily: '"DM Sans", sans-serif',
              color: '#666',
              fontSize: '14px'
            }}>
              {completedCount} of {tasks.length} tasks
            </span>
          </div>
          <div style={{
            height: '12px',
            background: '#E8E4DC',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #5B8C5A, #7BA67B)',
              borderRadius: '6px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ 
            textAlign: 'center', 
            marginTop: '8px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '24px',
            fontWeight: '600',
            color: '#5B8C5A'
          }}>
            {progress}%
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Tab Switcher */}
          <div style={{
            display: 'flex',
            background: 'white',
            borderRadius: '10px',
            padding: '4px',
            border: '1px solid #DDD'
          }}>
            <button
              onClick={() => setActiveTab('list')}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                padding: '8px 16px',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'list' ? '#2C3E50' : 'transparent',
                color: activeTab === 'list' ? 'white' : '#666',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <List size={16} />
              List
            </button>
            <button
              onClick={() => setActiveTab('gantt')}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                padding: '8px 16px',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'gantt' ? '#2C3E50' : 'transparent',
                color: activeTab === 'gantt' ? 'white' : '#666',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <GanttChart size={16} />
              Timeline
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {activeTab === 'list' && (
              <>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #DDD',
                    background: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: '#2C3E50'
                  }}
                >
                  <option value="all">All Categories</option>
                  {Object.entries(categoryConfig).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
                <button
                  onClick={toggleAllCategories}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #DDD',
                    background: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#666',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronsUpDown size={16} />
                  {allExpanded ? 'Collapse All' : 'Expand All'}
                </button>
              </>
            )}
            <button 
              onClick={() => setShowAddModal(true)}
              className="export-btn"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '2px solid #5B8C5A',
                background: 'white',
                color: '#5B8C5A',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Plus size={16} />
              Add Task
            </button>
            <button 
              onClick={exportToCSV}
              className="export-btn"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#2C3E50',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* List View */}
        {activeTab === 'list' && (
          <>
        {/* Task Categories */}
        {Object.entries(categoryConfig).map(([catKey, catConfig]) => {
          const catTasks = groupedTasks[catKey];
          if (filter !== 'all' && filter !== catKey) return null;
          if (catTasks.length === 0) return null;
          
          const Icon = catConfig.icon;
          const completedInCat = catTasks.filter(t => t.completed).length;
          
          return (
            <div key={catKey} style={{
              background: 'white',
              borderRadius: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden'
            }}>
              <div 
                className="category-header"
                onClick={() => toggleCategory(catKey)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: catConfig.bg,
                  borderBottom: expandedCategories[catKey] ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: catConfig.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} color="white" />
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '16px', 
                      fontWeight: '600',
                      color: '#2C3E50'
                    }}>
                      {catConfig.label}
                    </h3>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '13px',
                      color: '#888'
                    }}>
                      {completedInCat}/{catTasks.length} complete
                    </span>
                  </div>
                </div>
                {expandedCategories[catKey] ? <ChevronUp size={20} color="#888" /> : <ChevronDown size={20} color="#888" />}
              </div>
              
              {expandedCategories[catKey] && (
                <div>
                  {/* Sort Controls */}
                  <div style={{
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    background: 'rgba(0,0,0,0.01)'
                  }}>
                    <ArrowDownUp size={14} color="#888" />
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '12px',
                      color: '#888',
                      marginRight: '4px'
                    }}>
                      Sort:
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategorySortBy(prev => ({ ...prev, [catKey]: 'deadline' }));
                      }}
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: categorySortBy[catKey] === 'deadline' ? '600' : '400',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: categorySortBy[catKey] === 'deadline' ? catConfig.color : 'transparent',
                        color: categorySortBy[catKey] === 'deadline' ? 'white' : '#666',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Date
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategorySortBy(prev => ({ ...prev, [catKey]: 'priority' }));
                      }}
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: categorySortBy[catKey] === 'priority' ? '600' : '400',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: categorySortBy[catKey] === 'priority' ? catConfig.color : 'transparent',
                        color: categorySortBy[catKey] === 'priority' ? 'white' : '#666',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Priority
                    </button>
                  </div>
                  
                  {/* Tasks */}
                  <div style={{ padding: '8px 0' }}>
                  {catTasks.map(task => {
                    const daysUntil = getDaysUntil(task.deadline);
                    const isOverdue = daysUntil < 0;
                    const isUrgent = daysUntil >= 0 && daysUntil <= 7;
                    
                    return (
                      <div 
                        key={task.id}
                        className="task-row"
                        style={{
                          padding: '14px 20px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                          borderRadius: '8px',
                          margin: '0 8px',
                          transition: 'background 0.15s ease',
                          opacity: task.completed ? 0.6 : 1
                        }}
                      >
                        <button
                          className="checkbox"
                          onClick={() => toggleTask(task.id)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            border: task.completed ? 'none' : `2px solid ${catConfig.color}`,
                            background: task.completed ? catConfig.color : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          {task.completed && <Check size={14} color="white" strokeWidth={3} />}
                        </button>
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              fontSize: '15px',
                              fontWeight: '500',
                              color: '#2C3E50',
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}>
                              {task.task}
                            </span>
                            <span style={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: priorityColors[task.priority] + '20',
                              color: priorityColors[task.priority],
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {task.priority}
                            </span>
                          </div>
                          {task.notes && (
                            <p style={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontSize: '13px',
                              color: '#888',
                              margin: '4px 0 0 0',
                              lineHeight: '1.4'
                            }}>
                              {task.notes}
                            </p>
                          )}
                        </div>
                        
                        <div style={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '13px',
                          color: isOverdue ? '#D64545' : isUrgent ? '#D4A84B' : '#888',
                          fontWeight: isOverdue || isUrgent ? '600' : '400',
                          whiteSpace: 'nowrap',
                          textAlign: 'right',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <div>
                            <div>{formatDate(task.deadline)}</div>
                            {!task.completed && (
                              <div style={{ fontSize: '11px', marginTop: '2px' }}>
                                {isOverdue ? 'Overdue' : `${daysUntil}d left`}
                              </div>
                            )}
                          </div>
                          <button
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditTask(task);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '6px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Pencil size={14} color="#888" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer tip */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '13px',
          color: '#888'
        }}>
          💡 Tip: Export to CSV and import into Trello for collaborative planning
        </div>
          </>
        )}

        {/* Gantt Chart View */}
        {activeTab === 'gantt' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
            overflow: 'hidden'
          }}>
            {/* Gantt Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#2C3E50'
                }}>
                  Timeline to Moving Day
                </h3>
                <p style={{
                  margin: '4px 0 0 0',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  color: '#888'
                }}>
                  Dec 23, 2025 → Feb 9, 2026
                </p>
              </div>
              <div style={{
                display: 'flex',
                gap: '16px',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '12px'
              }}>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      background: config.color
                    }} />
                    <span style={{ color: '#666' }}>{config.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ padding: '20px 24px', overflowX: 'auto' }}>
              {(() => {
                const startDate = new Date('2025-12-23');
                const endDate = new Date('2026-02-09');
                const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                const dayWidth = 18;
                
                // Generate week markers
                const weeks = [];
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                  weeks.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 7);
                }
                
                // Sort all tasks by deadline
                const sortedTasks = [...tasks].sort((a, b) => 
                  new Date(a.deadline) - new Date(b.deadline)
                );

                return (
                  <div style={{ minWidth: totalDays * dayWidth + 200 }}>
                    {/* Week headers */}
                    <div style={{
                      display: 'flex',
                      marginLeft: '200px',
                      borderBottom: '1px solid #EEE',
                      paddingBottom: '8px',
                      marginBottom: '16px'
                    }}>
                      {weeks.map((week, i) => (
                        <div
                          key={i}
                          style={{
                            width: dayWidth * 7,
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '11px',
                            color: '#888',
                            fontWeight: '500'
                          }}
                        >
                          {week.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      ))}
                    </div>

                    {/* Moving day marker */}
                    <div style={{
                      position: 'relative',
                      marginLeft: '200px',
                      height: '0'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: (Math.ceil((new Date('2026-02-07') - startDate) / (1000 * 60 * 60 * 24))) * dayWidth,
                        width: dayWidth * 3,
                        height: sortedTasks.length * 44 + 20,
                        background: 'rgba(214, 69, 69, 0.08)',
                        borderLeft: '2px dashed #D64545',
                        zIndex: 0
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '4px',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#D64545',
                          whiteSpace: 'nowrap'
                        }}>
                          MOVE DAYS
                        </span>
                      </div>
                      
                      {/* Today marker - positioned relative to task area */}
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: sortedTasks.length * 44 + 20,
                        background: '#5B8C5A',
                        zIndex: 10
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '-14px',
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#5B8C5A',
                          whiteSpace: 'nowrap'
                        }}>
                          TODAY
                        </span>
                      </div>
                    </div>

                    {/* Task rows */}
                    {sortedTasks.map((task, index) => {
                      const taskDate = new Date(task.deadline);
                      const daysFromStart = Math.ceil((taskDate - startDate) / (1000 * 60 * 60 * 24));
                      const barWidth = Math.max(dayWidth * 3, 60);
                      const catConfig = categoryConfig[task.category];
                      
                      return (
                        <div
                          key={task.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '36px',
                            marginBottom: '8px',
                            position: 'relative'
                          }}
                        >
                          {/* Task name */}
                          <div style={{
                            width: '200px',
                            paddingRight: '16px',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '13px',
                            color: task.completed ? '#AAA' : '#2C3E50',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flexShrink: 0
                          }}>
                            {task.task}
                          </div>
                          
                          {/* Timeline bar */}
                          <div style={{
                            flex: 1,
                            position: 'relative',
                            height: '100%'
                          }}>
                            {/* Grid lines */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex'
                            }}>
                              {weeks.map((_, i) => (
                                <div
                                  key={i}
                                  style={{
                                    width: dayWidth * 7,
                                    height: '100%',
                                    borderLeft: '1px solid #F0F0F0'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Task bar */}
                            <div
                              onClick={() => startEditTask(task)}
                              style={{
                                position: 'absolute',
                                left: Math.max(0, (daysFromStart - 2) * dayWidth),
                                top: '4px',
                                width: barWidth,
                                height: '28px',
                                background: task.completed 
                                  ? `${catConfig.color}40` 
                                  : catConfig.color,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                              }}
                            >
                              {task.completed && (
                                <Check size={14} color={catConfig.color} strokeWidth={3} />
                              )}
                              <span style={{
                                fontFamily: '"DM Sans", sans-serif',
                                fontSize: '10px',
                                fontWeight: '600',
                                color: task.completed ? catConfig.color : 'white',
                                marginLeft: task.completed ? '2px' : '0',
                                whiteSpace: 'nowrap'
                              }}>
                                {formatDate(task.deadline)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: '700',
                color: '#2C3E50'
              }}>
                Add New Task
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}
              >
                <X size={24} color="#888" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Task Name */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Task Name *
                </label>
                <input
                  type="text"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  placeholder="e.g., Cancel gym membership"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '15px',
                    fontFamily: '"Source Serif 4", Georgia, serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5B8C5A'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E4DC'}
                />
              </div>

              {/* Category & Priority Row */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#555',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '2px solid #E8E4DC',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {Object.entries(categoryConfig).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#555',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '2px solid #E8E4DC',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Deadline
                </label>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Notes */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Notes (optional)
                </label>
                <textarea
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  placeholder="Any additional details..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginTop: '8px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: '2px solid #DDD',
                    background: 'white',
                    color: '#666',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addTask}
                  disabled={!newTask.task.trim()}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    border: 'none',
                    background: newTask.task.trim() ? '#5B8C5A' : '#CCC',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: newTask.task.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: '700',
                color: '#2C3E50'
              }}>
                Edit Task
              </h2>
              <button
                onClick={() => setEditingTask(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}
              >
                <X size={24} color="#888" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Task Name */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Task Name *
                </label>
                <input
                  type="text"
                  value={editingTask.task}
                  onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '15px',
                    fontFamily: '"Source Serif 4", Georgia, serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5B8C5A'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E4DC'}
                />
              </div>

              {/* Category & Priority Row */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#555',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    Category
                  </label>
                  <select
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '2px solid #E8E4DC',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {Object.entries(categoryConfig).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#555',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    Priority
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '2px solid #E8E4DC',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Deadline
                </label>
                <input
                  type="date"
                  value={editingTask.deadline}
                  onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Notes */}
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#555',
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  Notes (optional)
                </label>
                <textarea
                  value={editingTask.notes}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  placeholder="Any additional details..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '2px solid #E8E4DC',
                    fontSize: '14px',
                    fontFamily: '"DM Sans", sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                />
              </div>

              {/* Mark as Complete Toggle */}
              <div 
                onClick={() => setEditingTask({ ...editingTask, completed: !editingTask.completed })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '2px solid #E8E4DC',
                  cursor: 'pointer',
                  background: editingTask.completed ? '#E8F0E8' : 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: editingTask.completed ? 'none' : '2px solid #5B8C5A',
                  background: editingTask.completed ? '#5B8C5A' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}>
                  {editingTask.completed && <Check size={14} color="white" strokeWidth={3} />}
                </div>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  color: '#555',
                  fontWeight: '500'
                }}>
                  Mark as completed
                </span>
              </div>

              {/* Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginTop: '8px',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => deleteTask(editingTask.id)}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: '2px solid #D64545',
                    background: 'white',
                    color: '#D64545',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setEditingTask(null)}
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: '2px solid #DDD',
                      background: 'white',
                      color: '#666',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTask}
                    disabled={!editingTask.task.trim()}
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      padding: '12px 28px',
                      borderRadius: '10px',
                      border: 'none',
                      background: editingTask.task.trim() ? '#5B8C5A' : '#CCC',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: editingTask.task.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
