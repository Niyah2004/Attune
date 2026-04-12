import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { FiChevronLeft as Left, FiChevronRight as Right, FiCheckCircle as CheckOn, FiCircle as CheckOff } from 'react-icons/fi';

const CalendarOverview = ({ cycleLogs, cycles, onAddCycle }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Selection mode for logging past cycles directly on the grid
  const [logMode, setLogMode] = useState('idle'); // 'idle' | 'selectStart' | 'selectEnd'
  const [tempStart, setTempStart] = useState(null);
  
  // Minimal To-Do list state for demo
  const [todos, setTodos] = useState({
    [format(new Date(), 'yyyy-MM-dd')]: [
      { id: 1, text: 'Drink herbal tea', done: true },
      { id: 2, text: 'Evening stretching', done: false }
    ]
  });
  
  const [newTodo, setNewTodo] = useState('');

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formattedSelected = format(selectedDate, 'yyyy-MM-dd');

  const addDayTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos(prev => ({
      ...prev,
      [formattedSelected]: [...(prev[formattedSelected] || []), { id: Date.now(), text: newTodo, done: false }]
    }));
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => ({
      ...prev,
      [formattedSelected]: prev[formattedSelected].map(t => t.id === id ? { ...t, done: !t.done } : t)
    }));
  };

  const isCycleDay = (date) => {
    if (!cycles || cycles.length === 0) return false;
    for (let c of cycles) {
      if (c.startDate && c.endDate) {
        // Create full dates enforcing local midnight logic visually
        const start = new Date(c.startDate + 'T00:00:00');
        const end = new Date(c.endDate + 'T23:59:59');
        if (date >= start && date <= end) return true;
      }
    }
    return false;
  };

  const handleDayClick = (date) => {
    if (logMode === 'idle') {
       setSelectedDate(date);
    } else if (logMode === 'selectStart') {
       setTempStart(date);
       setLogMode('selectEnd');
    } else if (logMode === 'selectEnd') {
       // Support chronological regardless of which day was clicked first
       let pStart = tempStart;
       let pEnd = date;
       if (date < tempStart) {
         pStart = date;
         pEnd = tempStart;
       }
       if (onAddCycle) {
         onAddCycle(format(pStart, 'yyyy-MM-dd'), format(pEnd, 'yyyy-MM-dd'));
       }
       setLogMode('idle');
       setTempStart(null);
    }
  };

  return (
    <div className="glass-panel fade-in" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={handlePrevMonth}><Left /></button>
        <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}><Right /></button>
      </div>
      
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '12px',
        fontSize: '0.8rem', color: 'var(--text-muted)'
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {/* Fill empty grid spaces before the 1st of month */}
        {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map(date => {
          const isSelected = isSameDay(date, selectedDate);
          const hasTodo = todos[format(date, 'yyyy-MM-dd')]?.length > 0;
          const isCycle = isCycleDay(date);
          const isTempStart = tempStart && isSameDay(date, tempStart);

          // Aesthetic logic
          let bg = 'transparent';
          let textColor = 'var(--text-primary)';

          if (isCycle) bg = 'rgba(88, 96, 136, 0.4)'; // soft var(--season-winter)
          
          if (isSelected && logMode === 'idle') {
            bg = 'var(--accent-soft)';
            textColor = 'var(--bg-dark)';
          }

          if (isTempStart) {
             bg = 'var(--moon-glow)';
             textColor = 'var(--bg-dark)';
          }

          return (
            <div 
              key={date.toString()}
              onClick={() => handleDayClick(date)}
              style={{
                aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                background: bg,
                color: textColor,
                position: 'relative',
                transition: 'var(--transition-smooth)',
                border: logMode !== 'idle' ? '1px dashed transparent' : 'none',
                opacity: logMode !== 'idle' && !isTempStart ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (logMode !== 'idle' && !isTempStart) {
                  e.currentTarget.style.border = '1px dashed var(--moon-glow)';
                }
              }}
              onMouseLeave={(e) => {
                if (logMode !== 'idle') {
                  e.currentTarget.style.border = '1px dashed transparent';
                }
              }}
            >
              {format(date, 'd')}
              {hasTodo && !isSelected && !isTempStart && (
                <div style={{ position: 'absolute', bottom: '2px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--moon-glow)' }} />
              )}
            </div>
          )
        })}
      </div>

      {logMode === 'idle' ? (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button 
            onClick={() => setLogMode('selectStart')} 
            style={{ 
              padding: '6px 12px', fontSize: '0.85rem', borderRadius: '8px', 
              border: '1px solid var(--text-muted)', color: 'var(--text-muted)' 
            }}>
            Log Cycle Range
          </button>
        </div>
      ) : (
        <div className="fade-in" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(253, 245, 201, 0.1)', borderRadius: '8px' }}>
           <span style={{ color: 'var(--moon-glow)', fontSize: '0.9rem', fontWeight: '500' }}>
             {logMode === 'selectStart' ? 'Tap cycle Start Date' : 'Tap cycle End Date'}
           </span>
           <button onClick={() => { setLogMode('idle'); setTempStart(null); }} style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>Cancel</button>
        </div>
      )}

      {logMode === 'idle' && (
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <h4 style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>Tasks for {format(selectedDate, 'MMM d')}</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {(todos[formattedSelected] || []).map(todo => (
              <div 
                key={todo.id} 
                onClick={() => toggleTodo(todo.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: todo.done ? 0.5 : 1 }}
              >
                {todo.done ? <CheckOn color="var(--moon-glow)" /> : <CheckOff color="var(--text-muted)" />}
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
              </div>
            ))}
            {(!todos[formattedSelected] || todos[formattedSelected].length === 0) && (
               <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No tasks for this day.</div>
            )}
          </div>

          <form onSubmit={addDayTodo} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add an intention..."
              style={{
                flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                background: 'var(--bg-panel)', color: 'var(--text-primary)', outline: 'none'  
              }}
            />
            <button type="submit" style={{ padding: '8px', color: 'var(--moon-glow)' }}>+</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default CalendarOverview;
